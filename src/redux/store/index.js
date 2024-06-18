import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userInfo";
import modalReducer from "../reducers/modal";
export default configureStore({
  reducer: {
    UserDetails: userReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
