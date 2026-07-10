import React from 'react';
import { useGame } from '../../state/GameContext';
import { ACTIONS } from '../../state/reducer';
import { SCENES } from '../../game/constants';
import { startRain } from '../../utils/audio';
import './IntroSequence.css';

export default function IntroSequence() {
  const { dispatch } = useGame();

  const handleEnter = () => {
    startRain();
    dispatch({ type: ACTIONS.SET_SCENE, payload: SCENES.ROOM });
  };

  return (
    <div className="intro-screen" onClick={handleEnter}>
      <div className="intro-text">
        <p>雨水顺着窗户滑下来。他站在门外，钥匙在手里攥了很久。</p>
        <p>三个月了。杨锦荣的办公室一直空着。没有人来收拾。没有人敢。</p>
        <p>他推开门。房间很暗。雨的味道混合着灰尘。还有别的——一种很淡的、几乎辨认不出的气味。薄荷。和什么东西烧过的痕迹。</p>
        <p>他走进去。门在他身后轻轻合上。</p>
        <p className="intro-hint">（点击屏幕继续）</p>
      </div>
    </div>
  );
}
