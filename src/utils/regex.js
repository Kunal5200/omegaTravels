export const isEmail = (value) => {
  const checkvalue = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    value
  );
  return checkvalue;
};
