// useHover - Track hover state on a ref.
function useHover() {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return [ref, hovered];
}
