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
        <p>雨水顺着走廊的窗户滑下来。这个时间保安科早就没人了。你知道他的办公室是哪一间。你也知道今晚他带队出外勤——不到凌晨回不来。</p>
        <p>房间很暗，窗帘没拉。街灯的光从窗户渗进来，在地上铺了一小片冷白。空气里有他的味道——须后水、旧纸、和一种很淡的薄荷味。他今天吃过糖。</p>
        <p className="intro-hint">（点击屏幕继续）</p>
      </div>
    </div>
  );
}
