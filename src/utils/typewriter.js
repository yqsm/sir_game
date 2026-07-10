/**
 * 打字机效果工具
 * @param {string} text - 要逐字显示的文本
 * @param {number} msPerChar - 每个字的间隔（毫秒）
 * @param {AbortSignal} signal - 可选的取消信号
 * @returns {AsyncGenerator<string>} 每次 yield 当前累积的文本
 */
export async function* typewriter(text, msPerChar = 40, signal = null) {
  let accumulated = '';
  for (let i = 0; i < text.length; i++) {
    if (signal?.aborted) {
      // 被跳过时直接返回完整文本
      yield text;
      return;
    }
    accumulated += text[i];
    yield accumulated;
    await new Promise(resolve => setTimeout(resolve, msPerChar));
  }
}

/**
 * 创建一个可以被外部 abort 的打字机控制器
 */
export function createTypewriterController() {
  const controller = new AbortController();
  return {
    signal: controller.signal,
    skip: () => controller.abort(),
  };
}
