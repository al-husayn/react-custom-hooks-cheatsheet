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
