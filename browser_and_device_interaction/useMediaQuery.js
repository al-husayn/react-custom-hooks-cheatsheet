//  useMediaQuery - check css breakpoint
function useMediaQuery(q) {
  const [matches, setMatches] = useState(() => matchMedia(q).matches);
  useEffect(() => {
    const onChange = (e) => setMatches(e.matches);
    matchMedia(q).addEventListener("change", onChange);
    return () => matchMedia(q).removeEventListener("change", onChange);
  }, [q]);
  return matches;
}
