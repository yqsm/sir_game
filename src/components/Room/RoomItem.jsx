import React, { useCallback } from 'react';
import { useGame } from '../../state/GameContext';
import { ACTIONS } from '../../state/reducer';
import { SCENES, ITEM_TIER_THRESHOLDS } from '../../game/constants';
import './RoomItem.css';

export default function RoomItem({ item }) {
  const { state, dispatch } = useGame();
  const {
    discoveredItems, flags, scene,
  } = state;

  const isDiscovered = discoveredItems.includes(item.id);
  const hasFlag = item.flag ? flags[item.flag] : true;

  // 层级解锁逻辑：基于已发现总数
  const totalFound = discoveredItems.length;

  let isLocked = false;
  let lockReason = '';
  if (item.tier === 'mid' && totalFound < ITEM_TIER_THRESHOLDS.MID_TIER) {
    isLocked = true;
    lockReason = `（需先探索 ${ITEM_TIER_THRESHOLDS.MID_TIER} 件物品）`;
  }
  if (item.tier === 'deep' && totalFound < ITEM_TIER_THRESHOLDS.DEEP_TIER) {
    isLocked = true;
    lockReason = `（需先探索 ${ITEM_TIER_THRESHOLDS.DEEP_TIER} 件物品）`;
  }
  // 物品前置条件
  if (item.prerequisite && !discoveredItems.includes(item.prerequisite)) {
    isLocked = true;
    lockReason = '（需要先找到钥匙）';
  }

  const handleClick = useCallback(() => {
    if (isLocked) return;
    if (scene !== SCENES.ROOM) return;

    // 记录点击次数（彩蛋用）
    dispatch({ type: ACTIONS.INCREMENT_CLICK_COUNT, payload: item.id });

    // 发现物品
    if (!isDiscovered) {
      dispatch({ type: ACTIONS.DISCOVER_ITEM, payload: item.id });
    }

    // 设置 flag
    if (item.flag && !hasFlag) {
      dispatch({ type: ACTIONS.SET_FLAG, payload: { flag: item.flag } });
    }

    // 迷你分支
    if (item.miniChoice && scene === SCENES.ROOM) {
      dispatch({ type: ACTIONS.SET_CURRENT_MEMORY, payload: item });
      dispatch({ type: ACTIONS.SET_SCENE, payload: SCENES.MINI_CHOICE });
      dispatch({
        type: ACTIONS.QUEUE_DIALOGUE,
        payload: {
          type: 'miniChoice',
          itemId: item.id,
          prompt: item.miniChoice.prompt,
          options: item.miniChoice.options,
        },
      });
      return;
    }

    // 正常记忆覆层
    dispatch({ type: ACTIONS.SET_CURRENT_MEMORY, payload: item });
    dispatch({ type: ACTIONS.SET_SCENE, payload: SCENES.MEMORY });
    if (item.memory) {
      dispatch({ type: ACTIONS.QUEUE_DIALOGUE, payload: { type: 'memory', lines: item.memory } });
    }
  }, [isLocked, isDiscovered, scene, item, dispatch, hasFlag]);

  const className = [
    'room-item',
    isDiscovered ? 'discovered' : 'undiscovered',
    isLocked ? 'locked' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={className}
      style={{
        left: `${item.position.x}%`,
        top: `${item.position.y}%`,
        width: `${item.size.w}%`,
        height: `${item.size.h}%`,
      }}
      onClick={handleClick}
    >
      <div className="item-hitbox" style={{ width: '100%', height: '100%', borderRadius: '2px' }} />
      <div className="item-tooltip">
        {item.hint}{isLocked ? ` ${lockReason}` : isDiscovered ? '（已查看）' : ''}
      </div>
    </div>
  );
}
