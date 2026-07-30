// useGeolocation - user's current position.
function useGeolocation() {
  const [pos, setPos] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (p) => setPos(p.coords),
      (err) => setError(err.message)
    );
  }, []);
  return { pos, error };
}