const { useEffect } = require("react");

// useInfiniteScroll - load more near bottom
function useInfiniteScroll(callback) {
  useEffect(() => {
    const onScroll = () => {
      const bottom = innerHeight + scrollY >= document.body.offsetHeight - 100;
      if (bottom) callback();
    };
    addEventListener("scroll", onScroll);
    return ()=> removeEventListener("scroll", onScroll)
  }, [callback])
}