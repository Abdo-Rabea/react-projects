import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
const store = configureStore({
  //  root reducer
  reducer: {
    user: userReducer,
  },
});

export default store;
