// useInterval - setInterval with fresh callback
function useInterval(callback, delay) {
  const saved = useRef(callback);
  saved.current = callback;
  useEffect(() => {
    if (delay == null) return;
    const id = setInterval(() => saved.current(), delay);
    return clearInterval(id);
  }, [delay]);
}
