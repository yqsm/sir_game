import React from 'react';
import { useGame } from './state/GameContext';
import { SCENES } from './game/constants';
import TitleScreen from './components/TitleScreen/TitleScreen';
import IntroSequence from './components/IntroSequence/IntroSequence';
import Room from './components/Room/Room';
import MemoryOverlay from './components/MemoryOverlay/MemoryOverlay';
import DialogueBox from './components/DialogueBox/DialogueBox';
import DecisionPanel from './components/DecisionPanel/DecisionPanel';
import EndingScreen from './components/EndingScreen/EndingScreen';
import './App.css';

export default function App() {
  const { state } = useGame();
  const { scene, transitionEffect } = state;

  const renderScene = () => {
    switch (scene) {
      case SCENES.TITLE:
        return <TitleScreen />;
      case SCENES.INTRO:
        return <IntroSequence />;
      case SCENES.ROOM:
      case SCENES.MINI_CHOICE:
      case SCENES.MEMORY:
        return (
          <>
            <Room />
            {scene === SCENES.MEMORY && <MemoryOverlay />}
            {scene === SCENES.MINI_CHOICE && <DialogueBox mode="miniChoice" />}
          </>
        );
      case SCENES.DECISION:
        return (
          <>
            <Room />
            <DecisionPanel />
          </>
        );
      case SCENES.ENDING:
        return <EndingScreen />;
      default:
        return <TitleScreen />;
    }
  };

  return (
    <div className={`app ${transitionEffect || ''}`}>
      {renderScene()}
    </div>
  );
}
