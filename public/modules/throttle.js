export function throttle(func, delay) {
  let lastCallTime = 0;
  const now = Date.now();
  if (now - lastCallTime >= delay) {
    func();
    lastCallTime = now;
  }
}
