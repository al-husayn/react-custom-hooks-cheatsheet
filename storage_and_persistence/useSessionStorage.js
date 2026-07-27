//  useSessionStorage - cleared when tabs closes
function useSessionStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const saved = sessionStorage.getItem(key);
    return saved ? JSON.parse(saved) : initial;
  });
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
