import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userInfo";
export default configureStore({
  reducer: {
    UserDetails: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
