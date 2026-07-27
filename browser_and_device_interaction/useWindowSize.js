// useWindowSize -  viewport width & height
function useWindowSize() {
  const [size, setSize] = useState([innerWidth, innerHeight]);
  useEffect(() => {
    const onResize = () => setSize([innerWidth, innerHeight]);
    addEventListener("resize", onResize);
  }, []);
  return size;
}
