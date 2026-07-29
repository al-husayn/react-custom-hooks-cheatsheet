//  useThrottle - limit calls to once per interval
function useThrottle(callback, limit = 300) {
  const lastRun = useRef(0);
  return (...args) => {
    const now = Date.now();
    if (now - lastRun.current >= limit) {
      lastRun.current = now;
      callback(...args);
    }
  };
}
