// useHover - Track hover state on a ref.
function useHover() {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mouseenter", () => setHovered(true));
    el.addEventListener("mouseleave", () => setHovered(false));
  }, []);
  return [ref, hovered];
}
