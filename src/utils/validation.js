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
  useDigits = true
  // useSpecial = true
) {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = useUppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
  const digits = useDigits ? "0123456789" : "";
  // const special = useSpecial ? "!@#$%^&*()_+[]{}|;:,.<>?" : "";

  const allCharacters = lowercase + uppercase + digits;

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

export const addUserValidation = ({ state, setError, error }) => {
  const {
    first_name,
    last_name,
    username,
    password,
    email,
    phone_number,
    access_module,
    business_ids,
    gender,
    status,
    img,
  } = state;

  if (
    first_name === "" ||
    last_name === "" ||
    username === "" ||
    password === "" ||
    email === "" ||
    phone_number === "" ||
    access_module === "" ||
    business_ids === "" ||
    gender === "" ||
    status === "" ||
    img === null
  ) {
    setError({
      ...error,
      first_name: first_name === "" && "Please Enter First Name",
      last_name: last_name === "" && "Please Enter Last Name",
      username: "Please Enter Username",
      password: password === "" && "Please Enter Password",
      email: email === "" && "Please Enter Valid Email Id",
      phone_number: phone_number === "" && "Please Enter Valid Phone Number",
      access_module: access_module === "" && "Please Select Modules",
      business_ids: business_ids === "" && "Please Select Merchants",
      gender: gender === "" && "Please Select Gender",
      status: status === "" && "Please Select Status",
      img: img === "" && "Please Select Image",
    });
    return false;
  } else {
    return true;
  }
};
export const editUserValidation = ({ state, setError, error }) => {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    access_module,
    business_ids,
    status,
    img,
  } = state;

  if (
    first_name === "" ||
    last_name === "" ||
    email === "" ||
    phone_number === "" ||
    access_module === "" ||
    business_ids === "" ||
    status === "" ||
    img === null
  ) {
    setError({
      ...error,
      first_name: first_name === "" && "Please Enter First Name",
      last_name: last_name === "" && "Please Enter Last Name",

      email: email === "" && "Please Enter Valid Email Id",
      phone_number: phone_number === "" && "Please Enter Valid Phone Number",
      access_module: access_module === "" && "Please Select Modules",
      business_ids: business_ids === "" && "Please Select Merchants",
      status: status === "" && "Please Select Status",
      img: img === "" && "Please Select Image",
    });
    return false;
  } else {
    return true;
  }
};

export const updatePasswordValidation = ({ state, error, setError }) => {
  let { password, confirmPassword } = state;
  if (password === "" || confirmPassword === "") {
    setError({
      ...error,
      password: "Please Enter Password",
      confirmPassword: "Confirm Password Must Match Password ",
    });
    return false;
  } else {
    return true;
  }
};
