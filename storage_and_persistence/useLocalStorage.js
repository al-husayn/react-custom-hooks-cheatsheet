// useLocalStorage - persists across sessions
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initial;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initial;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
