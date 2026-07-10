let audioEl = null;

export function startRain() {
  if (audioEl) return;
  audioEl = new Audio('/rain.mp3');
  audioEl.loop = true;
  audioEl.volume = 0.2;
  audioEl.play().catch(() => {
    const resume = () => { audioEl?.play().catch(() => {}); document.removeEventListener('click', resume); };
    document.addEventListener('click', resume);
  });
}

export function setRainIntensity(phase) {
  if (!audioEl) return;
  audioEl.volume = 0.2 + phase * 0.04;
}
