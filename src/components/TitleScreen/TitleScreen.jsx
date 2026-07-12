import React, { useState } from 'react';
import { useGame } from '../../state/GameContext';
import { ACTIONS } from '../../state/reducer';
import { SCENES, STORAGE_KEY } from '../../game/constants';
import './TitleScreen.css';

const ENDING_NAMES = [
  { id: 'fenliRoad', name: '芬梨道上' },
  { id: 'noLoveInYourKilling', name: '你的杀人手法里没有对我的爱' },
  { id: 'underVastSky', name: '浩园之下' },
  { id: 'stockholmLover', name: '斯德哥尔摩情人' },
  { id: 'snakeBitesTail', name: '咬自己尾巴的蛇' },
  { id: 'suspended', name: '搁置' },
];

const ALL_ENDINGS = [
  'fenliRoad', 'noLoveInYourKilling', 'underVastSky',
  'stockholmLover', 'snakeBitesTail', 'suspended',
];

export default function TitleScreen() {
  const { state, dispatch } = useGame();
  const [showEndings, setShowEndings] = useState(false);
  const [titleClicks, setTitleClicks] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const completedEndings = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || '[]'
  );

  const handleTitleClick = () => {
    if (showPassword || unlocked) return;
    const next = titleClicks + 1;
    setTitleClicks(next);
    if (next >= 5) {
      setShowPassword(true);
      setTitleClicks(0);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput.trim() === '杨锦荣404') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ALL_ENDINGS));
      setShowPassword(false);
      setUnlocked(true);
      window.location.reload();
    } else {
      setPasswordError(true);
      setPasswordInput('');
    }
  };
  const allMainEndingsDone = [
    'fenliRoad', 'noLoveInYourKilling',
    'underVastSky', 'stockholmLover',
  ].every(e => completedEndings.includes(e));

  return (
    <div className="title-screen">
      <div className="title-content">
        <h1 className="title-main" onClick={handleTitleClick} style={{ cursor: 'pointer' }}>他的办公室</h1>
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

        {showPassword && (
          <form onSubmit={handlePasswordSubmit} className="title-password-form">
            <input
              type="text"
              value={passwordInput}
              onChange={e => { setPasswordInput(e.target.value); setPasswordError(false); }}
              placeholder="输入密码"
              className="title-password-input"
              autoFocus
            />
            <button type="submit" className="title-password-btn">确认</button>
            {passwordError && <div className="title-password-error">密码错误</div>}
          </form>
        )}
      </div>

      {completedEndings.length > 0 && (
        <>
          <div className="title-bottom">
            <div className="title-progress">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <span key={i} className={`progress-dot ${completedEndings.length >= i ? 'filled' : ''}`}>
                  {i === 5 && completedEndings.length >= 5 ? '🐱' :
                   i === 6 && completedEndings.length >= 6 ? '🐕' :
                   completedEndings.length >= i ? '●' : '○'}
                </span>
              ))}
            </div>
          </div>

          <div className="title-endings-area">
            <button
              className="title-endings-toggle"
              onClick={() => setShowEndings(!showEndings)}
            >
              {showEndings ? '收起' : `已解锁 ${completedEndings.length}/6`}
            </button>

            {showEndings && (
              <div className="title-endings-list">
                {ENDING_NAMES.map(({ id, name }) => (
                  <div
                    key={id}
                    className={`title-ending-item ${completedEndings.includes(id) ? 'unlocked' : 'locked'}`}
                    onClick={() => {
                      if (completedEndings.includes(id)) {
                        dispatch({ type: ACTIONS.SET_ENDING, payload: id });
                      }
                    }}
                    style={completedEndings.includes(id) ? { cursor: 'pointer' } : {}}
                  >
                    {completedEndings.includes(id) ? name : '？？？'}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {completedEndings.length > 0 && (
        <button
          className="title-clear-btn"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          清除全部记录
        </button>
      )}
    </div>
  );
}
