import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useGame } from '../../state/GameContext';
import { ACTIONS } from '../../state/reducer';
import { SCENES } from '../../game/constants';
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
  const { currentDecision } = state;
  const [displayedPrompt, setDisplayedPrompt] = useState('');
  const [showOptions, setShowOptions] = useState(false);
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

  // 处理镜子揭示（已废弃——结局现在由敲门抉择后自动触发）
  // 保留代码以防后续使用


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
  const { state, dispatch } = useGame();
  const [easterEgg, setEasterEgg] = useState(null); // null | 'typing' | 'done'
  const [terminalText, setTerminalText] = useState('');
  const ctrlRef = useRef(null);

  const surfaceItems = ['tie', 'badge', 'glasses', 'mcdonalds', 'biscuit'];
  const allSurfaceFound = surfaceItems.every(id => state.discoveredItems.includes(id));

  const terminalLines = [
    '> 键入：杨锦荣',
    '> 键入：404',
    '> 把手放到他手心里，申请第二阶段生物认证',
    '> 认证失败。',
    '> 认证失败。',
    '> ……',
    '> 你不在系统里。从来都不在。',
  ];

  const handleLookCloser = () => {
    if (allSurfaceFound) {
      setEasterEgg('typing');
      const ctrl = createTypewriterController();
      ctrlRef.current = ctrl;
      let cancelled = false;
      (async () => {
        for (const line of terminalLines) {
          if (cancelled) break;
          for await (const partial of typewriter(line, 50, ctrl.signal)) {
            if (cancelled) break;
            setTerminalText(prev => {
              const lines = prev.split('\n');
              lines[lines.length - 1] = partial;
              return lines.join('\n');
            });
          }
          if (!cancelled) {
            setTerminalText(prev => prev + '\n');
          }
        }
        if (!cancelled) {
          await new Promise(r => setTimeout(r, 800));
          setEasterEgg('done');
          setTerminalText('');
          dispatch({ type: ACTIONS.MAKE_CHOICE, payload: { choiceKey: 'computerChecked', value: 'lookCloser' } });
          dispatch({ type: ACTIONS.SET_SCENE, payload: SCENES.ROOM });
        }
      })();
    } else {
      dispatch({ type: ACTIONS.MAKE_CHOICE, payload: { choiceKey: 'computerChecked', value: 'lookCloser' } });
      dispatch({ type: ACTIONS.SET_SCENE, payload: SCENES.ROOM });
    }
  };

  // 跳过打字机
  const skipTerminal = () => {
    ctrlRef.current?.skip();
  };

  if (easterEgg) {
    return (
      <div className="decision-overlay" onClick={skipTerminal}>
        <div className="decision-card" style={{ fontFamily: 'monospace' }}>
          <div className="decision-title" style={{ color: '#5a8a5a' }}>TERMINAL</div>
          <div className="decision-prompt" style={{ color: '#7aaa7a', whiteSpace: 'pre-wrap' }}>
            {terminalText || '_'}
          </div>
          {easterEgg === 'typing' && <div className="dialogue-hint">（点击跳过）</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="decision-overlay">
      <div className="decision-card">
        <div className="decision-title">电脑屏幕亮了</div>
        <div className="decision-prompt">
          屏幕上出现的是警队人事系统。深蓝色的界面，左上角是警务处的徽章。搜索栏里已经打好了刘建明的警号——不是他自己输入的。是警证里的芯片触发的。像是有人在等他来看。光标在搜索栏末尾一闪一闪。回车已经按过了。所有资料都在——评核报告，措辞官方而体面，每一份都有上级的签名。晋升记录，时间线和考核分数严丝合缝。薪金记录，数字按月递增，从未中断。他翻了五页。每一页都在说同一件事：刘建明是一个真实存在的高级督察。然后他翻到了最底层。需要最高权限才能看到的备注栏。只有一行小字。字体比正文略小。颜色是系统默认的黑色。不是红色——不是警报。只是备注。"此记录待确认。发起人：杨锦荣。状态：搁置。"下面没有处理历史。没有回复。没有关闭日期。这行字被放在这里，像是在等什么。等谁来确认。等谁来驳回。或者只是等——什么都不做。把一个人的存在悬在"待确认"三个字里。刘建明盯着屏幕。雨声很远。台灯的嗡鸣很近。光标还在闪。
        </div>
        <div className="decision-options">
          <button className="decision-btn" onClick={handleLookCloser}>
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
