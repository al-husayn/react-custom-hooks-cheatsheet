// useOnLineStatus -  detect connection drops
function useOnLineStatus() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const sync = setOnline(navigator.onLine);
    addEventListener("online", sync);
    addEventListener("offline", sync);
  }, [])
  return online;
}