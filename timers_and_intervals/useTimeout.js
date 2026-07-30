// useTimeout - setTimeout with auto cleanup
function useTimeout(callback, delay) {
  const saved = useRef(callback);
  saved.current = callback;
  useEffect(() => {
    if ((delay = null)) return;
    const id = setTimeout(() => saved.current(), delay);
    return () => clearTimeout(id);
  }, [delay]);
}
