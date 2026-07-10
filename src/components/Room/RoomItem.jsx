import React from 'react';
import { useGame } from '../../state/GameContext';
import { ACTIONS } from '../../state/reducer';
import { SCENES, ITEM_TIER_THRESHOLDS } from '../../game/constants';
import './RoomItem.css';

/** 用最新 state 判断某个物品的迷你分支是否已做过 */
function isMiniChoiceResolved(item, miniChoices, choices) {
  if (!item.miniChoice) return false;
  switch (item.id) {
    case 'badge':      return miniChoices.badgePickedUp !== undefined;
    case 'recorder':   return miniChoices.tapePlayed !== undefined;
    case 'mint':       return miniChoices.mintEaten !== undefined;
    case 'sleepPills': return miniChoices.sleepPillsCounted !== undefined;
    case 'rivalFile':  return miniChoices.rivalArchiveRead !== undefined;
    case 'report':     return choices.reportRead !== undefined && choices.reportRead !== null;
    default:           return false;
  }
}

export default function RoomItem({ item }) {
  const { state, dispatch } = useGame();
  const { discoveredItems, flags, scene, miniChoices, choices } = state;

  const isDiscovered = discoveredItems.includes(item.id);
  const hasFlag = item.flag ? flags[item.flag] : true;

  // 层级解锁
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
  if (item.prerequisite && !discoveredItems.includes(item.prerequisite)) {
    isLocked = true;
    lockReason = '（需要先找到钥匙）';
  }

  // 不用 useCallback，每次渲染都是最新闭包
  const handleClick = () => {
    if (isLocked) return;
    if (scene !== SCENES.ROOM) return;

    dispatch({ type: ACTIONS.INCREMENT_CLICK_COUNT, payload: item.id });

    if (!isDiscovered) {
      dispatch({ type: ACTIONS.DISCOVER_ITEM, payload: item.id });
    }
    if (item.flag && !hasFlag) {
      dispatch({ type: ACTIONS.SET_FLAG, payload: { flag: item.flag } });
    }

    // 用最新 state 判断，不走闭包
    if (item.miniChoice && !isMiniChoiceResolved(item, state.miniChoices, state.choices)) {
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

    // 领带彩蛋：第2次"很软"，第3次起显示杨锦荣的话
    if (item.id === 'tie') {
      const tieClicks = (state.itemClickCounts.tie || 0) + 1; // +1 预估本次点击
      if (tieClicks >= 3) {
        dispatch({ type: ACTIONS.SET_CURRENT_MEMORY, payload: { name: '？？？', memory: ['"别总是对我领带下手。"', '杨锦荣的口吻。但他不在。这句话是怎么出现在这里的？'] }});
        dispatch({ type: ACTIONS.SET_SCENE, payload: SCENES.MEMORY });
        return;
      }
      if (tieClicks >= 2) {
        dispatch({ type: ACTIONS.SET_CURRENT_MEMORY, payload: { name: '领带', memory: ['他把领带捏在指尖。丝绸很凉。很软。'] }});
        dispatch({ type: ACTIONS.SET_SCENE, payload: SCENES.MEMORY });
        return;
      }
    }

    // 正常记忆
    dispatch({ type: ACTIONS.SET_CURRENT_MEMORY, payload: item });
    dispatch({ type: ACTIONS.SET_SCENE, payload: SCENES.MEMORY });
    if (item.memory) {
      dispatch({ type: ACTIONS.QUEUE_DIALOGUE, payload: { type: 'memory', lines: item.memory } });
    }
  };

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
