const { useState, useEffect } = require("react");

// useFetch - GET/POST + loading/error state
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(url).then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [url]);
  return { data, loading };
}