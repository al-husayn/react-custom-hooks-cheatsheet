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

## DATA FETCHING & API CALLS

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

## FORM HANDLING

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

## STORAGE & PERSISTENCE

Theme, auth tokens and temporary form data - persisted the right way, without SSR crashes.

```js
// useLocalStorage - persists accross sessions
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initial;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

//  useSessionStorage - cleared when tabs closes
function useSessionStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const saved = sessionStorage.getItem(key);
    return saved ? JSON.parse(saved) : initial;
  });
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
```

**Why it matters:** the lazy initializer avoids reading storage on every render - a detail most tutorials skip.

## PERFORMANCE & OPTIMIZATION

Search bars and scroll handlers fire constantly - these two hooks keep them from wrecking performance.

```js
// useDebounce  - waiting for typing to stop
function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

//  useThrottle - limit calls to once per interval
function useThrottle(callback, limit = 300) {
  const lastRun = useRef(0);
  return (...args) => {
    const now = Date.now();
    if (now - lastRun.current >= limit) {
      lastRun.current = now;
      callback(...args);
    }
  };
}
```

**Why it matters:** debounce = wait until typing stops (search input); throttle = run at most once per N ms (scroll/resize).

## UI STATE MANAGEMENT
Modals, dropdowns, accordions, and hover effects all reduce to the same three tiny patterns.

```js
// useToggle - flip a boolean state
function useToggle(initial = false) {
  const [state, setState] = useState(initial);
  return [state, () => setState((s) => !s)];
}

// useDisclosure - explicit open/close (modals)
function useDisclosure() {
  const [isOpen, setIsOpen] = useState(false);
  return {
    isOpen,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
  };
}

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
```
**Why it matters:** useDisclosure beats useToggle for modals since it names both actions explicitly.

## AUTH & USER-RELATED
Logged-in state and role checks should live in one hook, not scattered accross components.

```js
// useAuth - read auth context (login/logout)
function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth needs AuthProvider");
  return ctx; // {user, login, logout }
}

//  usePermissions - role based access check
function usePermissions(required = []) {
  const { user } = useAuth();
  return useMemo(() => {
    if (!user) return false;
    return required.every(p => user.permissions.include(p))
  }, [user, required]);
}

```

**Why it matters:** usePermissions is memoized so role checks don't rerun on every render.