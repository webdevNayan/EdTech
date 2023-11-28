import { configureStore } from "@reduxjs/toolkit";
import courseSlice from "./courseSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    courseReducer: courseSlice,
    userReducer: userSlice,
  },

});
