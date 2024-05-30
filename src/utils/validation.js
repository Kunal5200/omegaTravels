export const loginValidation = ({ value, setError, error, setValidation }) => {
  const { email, password } = value;
  if (email === "" || password === "") {
    setError({
      ...error,
      email: email === "" && "Please Enter Valid Email",
      password: password === "" && "Please Enter Password",
    });
    setValidation(false);
    return false;
  } else {
    setValidation(true);
    return true;
  }
};
