let audioEl = null;
let started = false;

export function startRain() {
  if (started) return;
  started = true;
  audioEl = new Audio(import.meta.env.BASE_URL + 'rain.mp3');
  audioEl.loop = true;
  audioEl.volume = 0.2;
  const play = () => {
    audioEl.play().catch(() => {});
  };
  play();
  // 保险：如果被拦截，等下次点击重试
  document.addEventListener('click', play, { once: true });
}

export function setRainIntensity(phase) {
  if (!audioEl) return;
  audioEl.volume = 0.2 + phase * 0.04;
}

export function stopRain() {
  if (audioEl) {
    audioEl.pause();
    audioEl = null;
    started = false;
  }
}

/** 播放结局专属音乐，停止雨声 */
export function playEndingMusic(filename) {
  stopRain();
  const music = new Audio(import.meta.env.BASE_URL + filename);
  music.volume = 0.35;
  music.play().catch(() => {});
}
