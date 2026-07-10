import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useGame } from '../../state/GameContext';
import { ACTIONS } from '../../state/reducer';
import { SCENES } from '../../game/constants';
import { typewriter, createTypewriterController } from '../../utils/typewriter';
import './MemoryOverlay.css';

export default function MemoryOverlay() {
  const { state, dispatch } = useGame();
  const { currentMemory } = state;
  const [lineIndex, setLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const ctrlRef = useRef(null);

  const lines = currentMemory?.memory || [];

  // 打字机效果
  useEffect(() => {
    if (!lines.length || lineIndex >= lines.length) return;

    setIsTyping(true);
    const ctrl = createTypewriterController();
    ctrlRef.current = ctrl;
    let cancelled = false;

    (async () => {
      for await (const partial of typewriter(lines[lineIndex], 35, ctrl.signal)) {
        if (cancelled) return;
        setDisplayedText(partial);
      }
      if (!cancelled) setIsTyping(false);
    })();

    return () => { cancelled = true; };
  }, [lineIndex, lines]);

  const handleClick = useCallback(() => {
    if (isTyping) {
      // 跳过动画
      ctrlRef.current?.skip();
      setDisplayedText(lines[lineIndex]);
      setIsTyping(false);
      return;
    }

    // 下一行
    if (lineIndex + 1 < lines.length) {
      setLineIndex(lineIndex + 1);
      setDisplayedText('');
      setIsTyping(true);
      return;
    }

    // 关闭
    dispatch({ type: ACTIONS.SET_CURRENT_MEMORY, payload: null });
    dispatch({ type: ACTIONS.SET_SCENE, payload: SCENES.ROOM });
  }, [isTyping, lineIndex, lines, dispatch]);

  if (!currentMemory) return null;

  return (
    <div className="memory-overlay" onClick={handleClick}>
      <div className="memory-bg" />
      <div className="memory-card">
        <div className="memory-label">{currentMemory.name}</div>
        <div className="memory-text">
          {displayedText}
          {isTyping && <span className="cursor-blink">|</span>}
        </div>
        {!isTyping && (
          <div className="memory-hint">
            {lineIndex + 1 < lines.length ? '（点击继续）' : '（点击关闭）'}
          </div>
        )}
      </div>
    </div>
  );
}
