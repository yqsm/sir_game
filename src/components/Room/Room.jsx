import React, { useEffect, useState, useCallback } from 'react';
import { useGame } from '../../state/GameContext';
import { ACTIONS } from '../../state/reducer';
import { ITEMS } from '../../game/items';
import { SCENES, DECISION_TRIGGERS } from '../../game/constants';
import { determineEnding } from '../../game/endings';
import { setRainIntensity } from '../../utils/audio';
import RoomItem from './RoomItem';
import InventoryBar from '../InventoryBar/InventoryBar';
import './Room.css';

export default function Room() {
  const { state, dispatch } = useGame();
  const {
    atmospherePhase, discoveredItems, flags, miniChoices,
    triggeredDecisions, choices, scene,
  } = state;

  // 🌧️ 雨声随氛围变化
  useEffect(() => { setRainIntensity(atmospherePhase); }, [atmospherePhase]);

  // 抉择触发逻辑（电话和敲门独立触发，互不阻塞）
  useEffect(() => {
    if (scene !== SCENES.ROOM) return;

    const count = discoveredItems.length;

    // DP1: 电话响起 — 发现录音设备后触发
    if (!triggeredDecisions.includes('phone') && flags.foundSurveillance) {
      dispatch({ type: ACTIONS.TRIGGER_DECISION, payload: 'phone' });
      return;
    }

    // DP2: 电脑屏幕 — 警官证迷你分支后
    if (!triggeredDecisions.includes('computer') &&
        miniChoices.hasOwnProperty('badgePickedUp')) {
      if (miniChoices.badgePickedUp) {
        dispatch({ type: ACTIONS.TRIGGER_DECISION, payload: 'computer' });
        return;
      } else {
        dispatch({ type: ACTIONS.TRIGGER_DECISION, payload: 'computer-silent' });
      }
    }

    // DP3: 敲门声 — 18件全部找到才触发
    if (!triggeredDecisions.includes('door') &&
        count >= 18) {
      dispatch({ type: ACTIONS.TRIGGER_DECISION, payload: 'door' });
      return;
    }
  }, [scene, discoveredItems, flags, miniChoices, triggeredDecisions, dispatch]);

  // 🪞 敲门抉择完成后 → 自动触发结局
  useEffect(() => {
    if (scene === SCENES.ROOM &&
        choices.doorOpened &&
        !triggeredDecisions.includes('mirror')) {
      // 标记镜子已触发
      dispatch({ type: ACTIONS.TRIGGER_DECISION, payload: 'mirror-silent' });
      // 判定结局
      const ending = determineEnding(flags, choices, miniChoices, discoveredItems);
      dispatch({ type: ACTIONS.LOCK_ENDING, payload: ending });
      dispatch({ type: ACTIONS.SET_ENDING, payload: ending });
    }
  }, [scene, choices.doorOpened]);

  // 🥚 彩蛋逻辑
  const { itemClickCounts, easterEggsFound } = state;

  // 彩蛋3: 镜子 x5
  const [mirrorClicks, setMirrorClicks] = useState(0);
  const handleMirrorClick = useCallback(() => {
    if (triggeredDecisions.includes('mirror')) return;
    if (easterEggsFound.includes('mirror2x')) return;
    const next = mirrorClicks + 1;
    setMirrorClicks(next);
    if (next >= 2) {
      dispatch({ type: ACTIONS.RECORD_EASTER_EGG, payload: 'mirror2x' });
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

  // 彩蛋5: 窗口 x7
  const [windowClicks, setWindowClicks] = useState(0);
  const handleWindowClick = useCallback(() => {
    if (easterEggsFound.includes('window2x')) return;
    const next = windowClicks + 1;
    setWindowClicks(next);
    if (next >= 2) {
      dispatch({ type: ACTIONS.RECORD_EASTER_EGG, payload: 'window2x' });
      dispatch({ type: ACTIONS.SET_CURRENT_MEMORY, payload: {
        name: '窗外的猫',
        memory: [
          '窗外有一只猫的影子闪过——跳跃的姿势，尾巴很长。它停在窗台上，侧头看向窗内——或者说看向你。它的眼睛在雨夜里发着微微的绿光。',
          '它看了你三秒。然后跳走了。你想起杨锦荣说过"黑猫警长"。你至今不知道他是在说猫，还是在说你。'
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
        <div className="room-mirror" onClick={handleMirrorClick} />
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
    </div>
  );
}
