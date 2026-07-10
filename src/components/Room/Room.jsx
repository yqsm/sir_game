import React, { useEffect, useState, useCallback } from 'react';
import { useGame } from '../../state/GameContext';
import { ACTIONS } from '../../state/reducer';
import { ITEMS } from '../../game/items';
import { SCENES, DECISION_TRIGGERS } from '../../game/constants';
import { determineEnding, checkAllMainEndingsUnlocked, checkCreatorItems } from '../../game/endings';
import RoomItem from './RoomItem';
import InventoryBar from '../InventoryBar/InventoryBar';
import './Room.css';

export default function Room() {
  const { state, dispatch } = useGame();
  const {
    atmospherePhase, discoveredItems, flags, miniChoices,
    triggeredDecisions, choices, scene,
  } = state;

  // 抉择触发逻辑（顺序推进，不跳跃）
  useEffect(() => {
    if (scene !== SCENES.ROOM) return;

    const count = discoveredItems.length;
    const phoneDone = triggeredDecisions.includes('phone');

    // DP1: 电话响起 — 发现录音设备后，第一个触发
    if (!triggeredDecisions.includes('phone') && flags.foundSurveillance) {
      dispatch({ type: ACTIONS.TRIGGER_DECISION, payload: 'phone' });
      return;
    }

    // DP2: 电脑屏幕 — 警官证迷你分支后（电话之后才可能触发）
    if (phoneDone && !triggeredDecisions.includes('computer') &&
        miniChoices.hasOwnProperty('badgePickedUp')) {
      if (miniChoices.badgePickedUp) {
        dispatch({ type: ACTIONS.TRIGGER_DECISION, payload: 'computer' });
        return;
      } else {
        dispatch({ type: ACTIONS.TRIGGER_DECISION, payload: 'computer-silent' });
      }
    }

    // DP3: 报告的迷你分支（通过 DialogueBox 独立处理，这里不触发）

    // DP4: 敲门声 — 电话完成后 + ≥10 件物品。这是最后一个抉择。
    if (phoneDone && !triggeredDecisions.includes('door') &&
        count >= DECISION_TRIGGERS.DOOR_KNOCK) {
      dispatch({ type: ACTIONS.TRIGGER_DECISION, payload: 'door' });
      return;
    }

    // ⚠️ 不再自动触发镜子。镜子在条件满足后变为可点击状态，由玩家主动点击。
  }, [scene, discoveredItems, flags, miniChoices, triggeredDecisions, dispatch]);

  // 报告 DP: 当 foundReport flag 设置为 true 且 miniChoice 还没被触发时
  // 报告自身的 miniChoice 在 items.js 中定义，会被 RoomItem 自动处理
  // 但它也算一个决策点，需要被标记。我们在 RoomItem 点击 report 时处理。
  // 这里只是确保 reportDP 被标记为已触发
  useEffect(() => {
    if (scene === SCENES.ROOM && flags.foundReport && !triggeredDecisions.includes('reportDP')) {
      // 不用 dispatch TRIGGER_DECISION，因为 miniChoice 已经在 DialogueBox 中
      // 只是记录这个事件已经发生
      // 但我们需要它被计入"所有抉择完成"的条件中
      // 所以: 当 choices.reportRead 被设置后，自动标记 reportDP 为已触发
      if (choices.reportRead) {
        // 手动添加到 triggeredDecisions
        dispatch({
          type: ACTIONS.TRIGGER_DECISION,
          payload: 'reportDP'
        });
      }
    }
  }, [scene, flags.foundReport, choices.reportRead, triggeredDecisions, dispatch]);

  // 🥚 彩蛋逻辑
  const { itemClickCounts, easterEggsFound } = state;

  // 彩蛋1: 领带 x3
  useEffect(() => {
    if (itemClickCounts.tie >= 3 && !easterEggsFound.includes('tie3x')) {
      dispatch({ type: ACTIONS.RECORD_EASTER_EGG, payload: 'tie3x' });
      dispatch({ type: ACTIONS.SET_CURRENT_MEMORY, payload: {
        name: '？？？',
        memory: ['"别总是对我领带下手。"', '杨锦荣的口吻。但他不在。这句话是怎么出现在这里的？']
      }});
      dispatch({ type: ACTIONS.SET_SCENE, payload: SCENES.MEMORY });
    }
  }, [itemClickCounts.tie]);

  // 彩蛋3: 镜子 x5
  const [mirrorClicks, setMirrorClicks] = useState(0);
  const handleMirrorClick = useCallback(() => {
    if (triggeredDecisions.includes('mirror')) return;
    if (easterEggsFound.includes('mirror5x')) return;
    const next = mirrorClicks + 1;
    setMirrorClicks(next);
    if (next >= 5) {
      dispatch({ type: ACTIONS.RECORD_EASTER_EGG, payload: 'mirror5x' });
      dispatch({ type: ACTIONS.SET_CURRENT_MEMORY, payload: {
        name: '镜子里的倒影',
        memory: [
          '镜子里的脸突然不像你了。像是另一个人——一个没有卧底身份、没有韩琛、没有所有这些破事的刘建明。他穿着干净的制服，领带打得整整齐齐，眼神安静。他看着你，嘴唇动了一下。好像在说：还来得及。',
          '你眨了眨眼。镜子恢复正常。但你知道你看到了什么。'
        ]
      }});
      dispatch({ type: ACTIONS.SET_SCENE, payload: SCENES.MEMORY });
    }
  }, [mirrorClicks, triggeredDecisions, easterEggsFound, dispatch]);

  // 🪞 镜子是否进入"终结阶段"——可被点击揭示结局
  const phoneDone = triggeredDecisions.includes('phone');
  const doorDone = triggeredDecisions.includes('door');
  const count = discoveredItems.length;
  const mirrorActive = phoneDone && doorDone && count >= DECISION_TRIGGERS.MIRROR;

  const handleMirrorReveal = useCallback(() => {
    if (!mirrorActive) return;
    const ending = determineEnding(flags, choices, miniChoices, discoveredItems);
    const allUnlocked = checkAllMainEndingsUnlocked();
    const hasCreatorItems = checkCreatorItems(flags);

    if (allUnlocked && hasCreatorItems) {
      dispatch({ type: ACTIONS.LOCK_ENDING, payload: 'creatorAndHer' });
      dispatch({ type: ACTIONS.SET_ENDING, payload: 'creatorAndHer' });
    } else if (allUnlocked && !hasCreatorItems) {
      // 进入彩蛋模式但物品不够 → 提示
      dispatch({ type: ACTIONS.SET_CURRENT_MEMORY, payload: {
        name: '镜子',
        memory: ['镜子里你的倒影看着你。嘴唇动了动。"还差一点。老鼠的足迹。迷宫的出口。甜味的线索。找到它们，再回来。"']
      }});
      dispatch({ type: ACTIONS.SET_SCENE, payload: SCENES.MEMORY });
    } else {
      dispatch({ type: ACTIONS.LOCK_ENDING, payload: ending });
      dispatch({ type: ACTIONS.SET_ENDING, payload: ending });
    }
  }, [mirrorActive, flags, choices, miniChoices, discoveredItems, dispatch]);

  // 彩蛋5: 窗口 x7
  const [windowClicks, setWindowClicks] = useState(0);
  const handleWindowClick = useCallback(() => {
    if (easterEggsFound.includes('window7x')) return;
    const next = windowClicks + 1;
    setWindowClicks(next);
    if (next >= 7) {
      dispatch({ type: ACTIONS.RECORD_EASTER_EGG, payload: 'window7x' });
      dispatch({ type: ACTIONS.SET_CURRENT_MEMORY, payload: {
        name: '窗外的猫',
        memory: [
          '窗外有一只猫的影子闪过——跳跃的姿势，尾巴很长。它停在窗台上，侧头看向窗内——或者说看向你。它的眼睛在雨夜里发着微微的绿光。',
          '它看了你三秒。然后跳走了。你想起杨锦荣说过"狸花警长"。你至今不知道他是在说猫，还是在说你。'
        ]
      }});
      dispatch({ type: ACTIONS.SET_SCENE, payload: SCENES.MEMORY });
    }
  }, [windowClicks, easterEggsFound, dispatch]);

  return (
    <div className="room-container">
      {/* CSS 绘制的房间 */}
      <div className="room-bg">
        <div className="room-window" onClick={handleWindowClick} style={{ cursor: 'pointer' }} />
        <div className="room-blinds" style={{ pointerEvents: 'none' }} />
        <div className="room-desk" />
        <div className="room-lamp" />
        <div className="room-bookshelf" />
        <div className="room-wardrobe" />
        <div className="room-cabinet" />
        <div className="room-door" />
        <div
          className={`room-mirror ${mirrorActive ? 'mirror-active' : ''}`}
          onClick={mirrorActive ? handleMirrorReveal : handleMirrorClick}
          title={mirrorActive ? '镜子在发光。点击它。' : undefined}
        />
        <div className="room-mat" />
      </div>

      {/* 18 件可交互物品 */}
      {ITEMS.map(item => (
        <RoomItem key={item.id} item={item} />
      ))}

      {/* 氛围遮罩 */}
      <div
        className="atmosphere-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `radial-gradient(ellipse at 40% 30%, transparent 40%, rgba(0,0,0,${0.3 + atmospherePhase * 0.15}) 100%)`,
          transition: 'background 1.5s ease',
          zIndex: 5,
        }}
      />

      {/* 灯泡烧了 */}
      {atmospherePhase >= 4 && (
        <div style={{
          position: 'absolute', inset: 0,
          backgroundColor: `rgba(0,0,0,${0.3 + (atmospherePhase - 3) * 0.2})`,
          transition: 'background-color 2s ease',
          pointerEvents: 'none', zIndex: 6,
        }} />
      )}

      {/* 闪电 */}
      {atmospherePhase >= 1 && (
        <div style={{
          position: 'absolute', inset: 0,
          backgroundColor: 'rgba(255,255,255,0.03)',
          animation: 'lightning 8s infinite',
          pointerEvents: 'none', zIndex: 7,
        }} />
      )}

      <InventoryBar />

      {/* 镜子激活提示 */}
      {mirrorActive && (
        <div style={{
          position: 'absolute',
          bottom: '42px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(196,164,90,0.8)',
          fontSize: '14px',
          fontFamily: 'var(--font-serif)',
          zIndex: 19,
          animation: 'pulse 2s ease-in-out infinite',
          textAlign: 'center',
          pointerEvents: 'none',
        }}>
          镜子里有什么在闪烁。
        </div>
      )}
    </div>
  );
}
