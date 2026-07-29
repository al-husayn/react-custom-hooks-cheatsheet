// useToggle - flip a boolean state
function useToggle(initial = false) {
  const [state, setState] = useState(initial);
  return [state, () => setState((s) => !s)];
}
