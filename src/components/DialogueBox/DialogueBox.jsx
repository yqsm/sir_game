import React, { useCallback } from 'react';
import { useGame } from '../../state/GameContext';
import { ACTIONS } from '../../state/reducer';
import { SCENES } from '../../game/constants';
import './DialogueBox.css';

export default function DialogueBox() {
  const { state, dispatch } = useGame();
  const { currentMemory } = state;

  if (!currentMemory?.miniChoice) return null;

  const { prompt, options } = currentMemory.miniChoice;

  const handleChoice = useCallback((value) => {
    // 根据物品 ID 和选项值分派效果
    const itemId = currentMemory.id;

    if (itemId === 'badge') {
      dispatch({ type: ACTIONS.SET_MINI_CHOICE, payload: { key: 'badgePickedUp', value: value === 'pickUp' } });
    } else if (itemId === 'recorder') {
      dispatch({ type: ACTIONS.SET_MINI_CHOICE, payload: { key: 'tapePlayed', value: value === 'play' } });
    } else if (itemId === 'mint') {
      dispatch({ type: ACTIONS.SET_MINI_CHOICE, payload: { key: 'mintEaten', value: value === 'eat' } });
    } else if (itemId === 'sleepPills') {
      dispatch({ type: ACTIONS.SET_MINI_CHOICE, payload: { key: 'sleepPillsCounted', value: value === 'count' } });
    } else if (itemId === 'rivalFile') {
      dispatch({ type: ACTIONS.SET_MINI_CHOICE, payload: { key: 'rivalArchiveRead', value: value === 'read' } });
    } else if (itemId === 'report') {
      dispatch({ type: ACTIONS.MAKE_CHOICE, payload: { choiceKey: 'reportRead', value: value === 'readAll' ? 'readAll' : 'foldAway' } });
    }

    // 关闭迷你抉择
    dispatch({ type: ACTIONS.SET_CURRENT_MEMORY, payload: null });
    dispatch({ type: ACTIONS.SET_SCENE, payload: SCENES.ROOM });
  }, [currentMemory, dispatch]);

  return (
    <div className="mini-choice-overlay">
      <div className="mini-choice-card">
        <p className="mini-choice-prompt">{prompt}</p>
        <div className="mini-choice-buttons">
          {options.map((opt, i) => (
            <button
              key={i}
              className="mini-choice-btn"
              onClick={() => handleChoice(opt.value)}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
