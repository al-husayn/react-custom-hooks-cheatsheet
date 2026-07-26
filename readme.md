# REACT'S CUSTOM HOOKS CHEATSHEET/USECASES

## 9 real world categories  devs actually reuse in production with working code, explained simply.

1. Data Fetching / API calls
2. Form Handling
3. Browser / Device Interaction
4. Storage/ Persistence
5. Performance / Optimization
6. UI State Management
7. Auth / User related
8. Timers / Intervals
9. Third-Party Integration


# DATA FETCHING & API CALLS
Anytime you call an API or load a long list, these two hooks cover almost every real case.
```js 
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
```

```js
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
```
**Why it matters:** useFetch gives clean loading/error UI, and useInfiniteScroll reuses it for pagination - zero libraries needed