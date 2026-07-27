# REACT'S CUSTOM HOOKS CHEATSHEET/USECASES

## 9 real world categories devs actually reuse in production with working code, explained simply.

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
    fetch(url)
      .then((res) => res.json())
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
    return () => removeEventListener("scroll", onScroll);
  }, [callback]);
}
```

**Why it matters:** useFetch gives clean loading/error UI, and useInfiniteScroll reuses it for pagination - zero libraries needed

# FORM HANDLING

Every form needs value tracking, validation and submit logic - write it once, use it everywhere.

```js
// useForm - values, validation, submit
function useForm(initial, validate) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const handleChange = (e) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (!Object.keys(errs).length) onSubmit(values);
  };
  return { values, errors, handleChange, handleSubmit };
}
```

```js
// useInput - single field state + onChange
function useInput(initial = "") {
  const [value, setValue] = useState(initial);
  const onChange = (e) => setValue(e.target.value);
  return { value, onChange };
}
```

**Why it matters:** useForm scales to multi-field forms; useInput is the lightweight version for single search box or filter.

## BROWSER & DEVICE INTERACTION

Responsive UI and connection-aware apps start with these three (3) hooks.

```js
// useWindowSize -  viewport width & height
function useWindowSize() {
  const [size, setSize] = useState([innerWidth, innerHeight]);
  useEffect(() => {
    const onResize = () => setSize([innerWidth, innerHeight]);
    addEventListener("resize", onResize);
  }, []);
  return size;
}

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

// useOnLineStatus -  detect connection drops
function useOnLineStatus() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const sync = setOnline(navigator.onLine);
    addEventListener("online", sync);
    addEventListener("offline", sync);
  }, []);
  return online;
}
```

**Why it matters:** Combine all three (3) for responsive layouts that also warn users when they go offline.
