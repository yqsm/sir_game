import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useGame } from '../../state/GameContext';
import { ACTIONS } from '../../state/reducer';
import { SCENES, DECISION_TRIGGERS } from '../../game/constants';
import { determineEnding, checkAllMainEndingsUnlocked, checkCreatorItems } from '../../game/endings';
import { typewriter, createTypewriterController } from '../../utils/typewriter';
import './DecisionPanel.css';

// 抉择点定义
const DECISIONS = {
  phone: {
    id: 'phone',
    title: '电话响了',
    prompt: '桌上的座机突然响了。在这个时间、这个天气——不可能是公务电话。来电显示：内线，保安科前台。铃声响了三次。四次。这个房间里发生的每一件事杨锦荣都知道。',
    options: [
      { text: '接电话', value: 'answer', desc: '"……是我。"' },
      { text: '不接', value: 'ignore', desc: '铃声停了。沉默比刚才更长。' },
    ],
  },
  door: {
    id: 'door',
    title: '敲门声',
    prompt: '三下。不重也不轻。有人在敲办公室的门。你记得你锁了门。但杨锦荣也有钥匙。或者不是杨锦荣。门外的脚步声很轻，有人在等你回应。',
    options: [
      { text: '开门', value: 'open', desc: '一杯热茶，杯底一张纸条' },
      { text: '不出声', value: 'staySilent', desc: '门缝下塞进来一张对折的纸' },
    ],
  },
};

export default function DecisionPanel() {
  const { state, dispatch } = useGame();
  const { currentDecision, flags, discoveredItems, choices, miniChoices } = state;
  const [displayedPrompt, setDisplayedPrompt] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [mirrorMessage, setMirrorMessage] = useState('');
  const ctrlRef = useRef(null);

  const decision = DECISIONS[currentDecision];

  // 打字机显示 prompt
  useEffect(() => {
    if (!decision || decision.isMirror) return;

    setDisplayedPrompt('');
    setShowOptions(false);
    const ctrl = createTypewriterController();
    ctrlRef.current = ctrl;
    let cancelled = false;

    (async () => {
      for await (const partial of typewriter(decision.prompt, 30, ctrl.signal)) {
        if (cancelled) return;
        setDisplayedPrompt(partial);
      }
      if (!cancelled) setShowOptions(true);
    })();

    return () => { cancelled = true; };
  }, [currentDecision]);

  // 处理镜子揭示
  useEffect(() => {
    if (!decision?.isMirror) return;

    const ending = determineEnding(flags, choices, miniChoices, discoveredItems);
    const allUnlocked = checkAllMainEndingsUnlocked();
    const hasCreatorItems = checkCreatorItems(flags);

    let timeout;
    if (allUnlocked && hasCreatorItems) {
      setMirrorMessage('三件东西都在了。镜面开始发光——不是反射。是屏幕的光。');
      timeout = setTimeout(() => {
        dispatch({ type: ACTIONS.LOCK_ENDING, payload: 'creatorAndHer' });
        dispatch({ type: ACTIONS.SET_ENDING, payload: 'creatorAndHer' });
      }, 3500);
    } else if (allUnlocked && !hasCreatorItems) {
      setMirrorMessage('镜子里你的倒影看着你。嘴唇动了动。"还差一点。老鼠的足迹。迷宫的出口。甜味的线索。找到它们，再回来。"（点击继续探索）');
    } else {
      setMirrorMessage('镜子里不再是你的脸。你看到了自己——真正的自己。');
      timeout = setTimeout(() => {
        dispatch({ type: ACTIONS.LOCK_ENDING, payload: ending });
        dispatch({ type: ACTIONS.SET_ENDING, payload: ending });
      }, 3500);
    }

    return () => { if (timeout) clearTimeout(timeout); };
  }, [currentDecision]);

  const handleChoice = useCallback((value) => {
    const key = currentDecision === 'phone' ? 'phoneAnswered' :
                currentDecision === 'door' ? 'doorOpened' :
                currentDecision === 'computer' ? 'computerChecked' : null;

    if (key) {
      dispatch({ type: ACTIONS.MAKE_CHOICE, payload: { choiceKey: key, value } });
    }

    // 检查是否触发下一个抉择
    dispatch({ type: ACTIONS.SET_SCENE, payload: SCENES.ROOM });
  }, [currentDecision, dispatch]);

  if (!decision) {
    // 没有定义的标准抉择，检查是否是特殊的电脑屏幕/报告 DP
    if (currentDecision === 'computer') {
      return <ComputerDecision />;
    }
    if (currentDecision === 'reportDP') {
      return <ReportDecision />;
    }
    return null;
  }

  if (decision.isMirror) {
    const canReturn = mirrorMessage.includes('再回来');
    return (
      <div className="decision-overlay mirror-reveal"
        onClick={canReturn ? () => dispatch({ type: ACTIONS.SET_SCENE, payload: SCENES.ROOM }) : undefined}
        style={canReturn ? { cursor: 'pointer' } : {}}
      >
        <div className="mirror-text">{mirrorMessage}</div>
      </div>
    );
  }

  return (
    <div className="decision-overlay" onClick={() => { if (!showOptions) ctrlRef.current?.skip(); }}>
      <div className="decision-card">
        <div className="decision-title">{decision.title}</div>
        <div className="decision-prompt">
          {displayedPrompt}
          {!showOptions && <span className="cursor-blink">|</span>}
        </div>
        {showOptions && (
          <div className="decision-options">
            {decision.options.map((opt, i) => (
              <button
                key={i}
                className="decision-btn"
                onClick={(e) => { e.stopPropagation(); handleChoice(opt.value); }}
              >
                <span className="decision-btn-main">{opt.text}</span>
                <span className="decision-btn-desc">{opt.desc}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// 电脑屏幕抉择
function ComputerDecision() {
  const { dispatch } = useGame();

  return (
    <div className="decision-overlay">
      <div className="decision-card">
        <div className="decision-title">电脑屏幕亮了</div>
        <div className="decision-prompt">
          屏幕上出现的是警队人事系统。搜索栏里已经打好了刘建明的警号。所有资料齐全——评核报告、晋升记录、薪金记录。每一个字都是真的。但你知道这是假的。杨锦荣建的系统。他为你建的世界。一层描红纸——拿掉对下面的白纸没有任何影响。在系统的最底层，需要最高权限才能看到的备注栏里，只有一行小字："此记录待确认。发起人：杨锦荣。状态：搁置。"
        </div>
        <div className="decision-options">
          <button className="decision-btn" onClick={() => {
            dispatch({ type: ACTIONS.MAKE_CHOICE, payload: { choiceKey: 'computerChecked', value: 'lookCloser' } });
            dispatch({ type: ACTIONS.SET_SCENE, payload: SCENES.ROOM });
          }}>
            <span className="decision-btn-main">仔细查看</span>
            <span className="decision-btn-desc">往下翻，看那行备注</span>
          </button>
          <button className="decision-btn" onClick={() => {
            dispatch({ type: ACTIONS.MAKE_CHOICE, payload: { choiceKey: 'computerChecked', value: 'close' } });
            dispatch({ type: ACTIONS.SET_SCENE, payload: SCENES.ROOM });
          }}>
            <span className="decision-btn-main">关掉屏幕</span>
            <span className="decision-btn-desc">有些真相不需要亲眼确认</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// 报告抉择（DP3 实际上是迷你分支 #6，但如果有需要单独触发也可以在这里处理）
function ReportDecision() {
  const { dispatch } = useGame();

  return (
    <div className="decision-overlay">
      <div className="decision-card">
        <div className="decision-title">半页报告</div>
        <div className="decision-prompt">
          最后一页。一行被划掉的铅笔字。杨锦荣写的——但比正式报告的字要轻，要快。好像写的时候怕被人看到："……或者他是真的想做好人。"然后被划掉了。划痕很重。换成正式措辞——没有感情。只有事实。
        </div>
        <div className="decision-options">
          <button className="decision-btn" onClick={() => {
            dispatch({ type: ACTIONS.MAKE_CHOICE, payload: { choiceKey: 'reportRead', value: 'readAll' } });
            dispatch({ type: ACTIONS.SET_SCENE, payload: SCENES.ROOM });
          }}>
            <span className="decision-btn-main">读完被划掉的字</span>
            <span className="decision-btn-desc">他在纸上留下了凹痕</span>
          </button>
          <button className="decision-btn" onClick={() => {
            dispatch({ type: ACTIONS.MAKE_CHOICE, payload: { choiceKey: 'reportRead', value: 'foldAway' } });
            dispatch({ type: ACTIONS.SET_SCENE, payload: SCENES.ROOM });
          }}>
            <span className="decision-btn-main">折起来放回原处</span>
            <span className="decision-btn-desc">有些话没有被说出来是有原因的</span>
          </button>
        </div>
      </div>
    </div>
  );
}
