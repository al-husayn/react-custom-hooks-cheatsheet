// useClipboard - copy text, show confirmation
function useClipboard() {
  const [copied, setCopied] = useState(false);
  const copy = async (text) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return { copied, copy };
}
