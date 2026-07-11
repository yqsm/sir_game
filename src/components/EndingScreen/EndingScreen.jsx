import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useGame } from '../../state/GameContext';
import { STORAGE_KEY } from '../../game/constants';
import { ENDING_TEXTS } from '../../game/endings';
import { typewriter, createTypewriterController } from '../../utils/typewriter';
import './EndingScreen.css';

export default function EndingScreen() {
  const { state } = useGame();
  const { ending } = state;
  const [stage, setStage] = useState('title'); // title | text | done
  const [displayedText, setDisplayedText] = useState('');
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const ctrlRef = useRef(null);

  const endingData = ENDING_TEXTS[ending];

  // 标题打字机
  useEffect(() => {
    if (stage !== 'title' || !endingData) return;

    const ctrl = createTypewriterController();
    ctrlRef.current = ctrl;
    let cancelled = false;

    (async () => {
      // 打标题
      for await (const partial of typewriter(endingData.title, 80, ctrl.signal)) {
        if (cancelled) return;
        setDisplayedText(partial);
      }
      await new Promise(r => setTimeout(r, 800));
      if (cancelled) return;
      // 打副标题
      for await (const partial of typewriter(endingData.subtitle, 60, ctrl.signal)) {
        if (cancelled) return;
        setDisplayedText(endingData.title + '\n\n' + partial);
      }
      await new Promise(r => setTimeout(r, 1200));
      if (cancelled) return;
      setStage('text');
      setDisplayedText('');
    })();

    return () => { cancelled = true; };
  }, [stage, endingData]);

  // 正文打字机
  useEffect(() => {
    if (stage !== 'text' || !endingData) return;
    if (paragraphIndex >= endingData.paragraphs.length) {
      setStage('done');
      return;
    }

    const ctrl = createTypewriterController();
    ctrlRef.current = ctrl;
    let cancelled = false;

    (async () => {
      for await (const partial of typewriter(endingData.paragraphs[paragraphIndex], 50, ctrl.signal)) {
        if (cancelled) return;
        setDisplayedText(partial);
      }
      if (!cancelled) {
        // 等待后自动下一段
        await new Promise(r => setTimeout(r, 1500));
        if (!cancelled) {
          setParagraphIndex(i => i + 1);
          setDisplayedText('');
        }
      }
    })();

    return () => { cancelled = true; };
  }, [stage, paragraphIndex, endingData]);

  const handleClick = useCallback(() => {
    if (stage === 'text') {
      ctrlRef.current?.skip();
    }
  }, [stage]);

  const handleReplay = useCallback(() => {
    // 记录结局到 localStorage
    if (ending && ending !== 'eternalFriendship') {
      try {
        const completed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        if (!completed.includes(ending)) {
          completed.push(ending);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
        }
      } catch {}
    }
    window.location.reload();
  }, [ending]);

  if (!endingData) {
    return (
      <div className="ending-screen">
        <p>结局 ID 未知: {ending}</p>
        <button onClick={handleReplay}>重新开始</button>
      </div>
    );
  }

  return (
    <div className="ending-screen" onClick={handleClick}>
      <div className="ending-content">
        {stage === 'title' && (
          <div className="ending-title-text">
            {displayedText.split('\n').map((line, i) => (
              <div key={i}>{line || ' '}</div>
            ))}
            <span className="cursor-blink">|</span>
          </div>
        )}

        {stage === 'text' && (
          <div className="ending-body">
            <div className="ending-body-title">{endingData.title}</div>
            <div className="ending-body-subtitle">{endingData.subtitle}</div>
            <div className="ending-paragraphs">
              {/* 已完成的段落 */}
              {endingData.paragraphs.slice(0, paragraphIndex).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {/* 当前段落 */}
              {paragraphIndex < endingData.paragraphs.length && (
                <p>
                  {displayedText}
                  <span className="cursor-blink">|</span>
                </p>
              )}
            </div>
          </div>
        )}

        {stage === 'done' && (
          <div className="ending-complete">
            <div className="ending-body-title">{endingData.title}</div>
            <div className="ending-body-subtitle">{endingData.subtitle}</div>
            <div className="ending-paragraphs">
              {endingData.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="ending-fin">— 完 —</div>
            <button className="ending-replay-btn" onClick={handleReplay}>
              再来一次
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
