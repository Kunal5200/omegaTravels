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

export function generatePassword(
  length = 12,
  useUppercase = true,
  useDigits = true,
  // useSpecial = true
) {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = useUppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
  const digits = useDigits ? "0123456789" : "";
  // const special = useSpecial ? "!@#$%^&*()_+[]{}|;:,.<>?" : "";

  const allCharacters = lowercase + uppercase + digits ;

  if (allCharacters.length === 0) {
    throw new Error("At least one character set must be selected.");
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    password += allCharacters[randomIndex];
  }

  return password;
}
