import React from 'react';
import { useGame } from '../../state/GameContext';
import { ACTIONS } from '../../state/reducer';
import { SCENES, STORAGE_KEY } from '../../game/constants';
import './TitleScreen.css';

export default function TitleScreen() {
  const { state, dispatch } = useGame();

  const completedEndings = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || '[]'
  );
  const allMainEndingsDone = [
    'fenliRoad', 'noLoveInYourKilling',
    'underVastSky', 'stockholmLover',
  ].every(e => completedEndings.includes(e));

  return (
    <div className="title-screen">
      <div className="title-content">
        <h1 className="title-main">他的办公室</h1>
        <p className="title-sub">无间道同人 · 房间探索游戏</p>
        <button
          className="title-btn"
          onClick={() => dispatch({ type: ACTIONS.SET_SCENE, payload: SCENES.INTRO })}
        >
          进入
        </button>
        {allMainEndingsDone && (
          <button
            className="title-btn title-btn-hidden"
            onClick={() => {
              dispatch({ type: ACTIONS.SET_ENDING, payload: 'eternalFriendship' });
            }}
          >
            友谊地久天长？
          </button>
        )}
      </div>
      {completedEndings.length > 0 && (
        <div className="title-progress">
          {[1, 2, 3, 4].map(i => (
            <span key={i} className={`progress-dot ${completedEndings.length >= i ? 'filled' : ''}`}>
              {i === 3 && completedEndings.length >= 3 ? '🐱' :
               i === 4 && completedEndings.length >= 4 ? '🐕' :
               completedEndings.length >= i ? '●' : '○'}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
