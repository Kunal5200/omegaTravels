const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  email: "",
  isVerify: "",
};
const userInfo = createSlice({
  name: "UserDetails",
  initialState: "",
  reducers: {
    loginDetails: (state, actions) => {
      return (state = actions.payload);
    },
    logoutDetails: (state) => {
      return (state = initialState);
    },
  },
});

export const { loginDetails, logoutDetails } = userInfo.actions;
export default userInfo.reducer;
