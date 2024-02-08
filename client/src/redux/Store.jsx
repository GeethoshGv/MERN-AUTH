import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./userSlice/userSlice.jsx";

export const store = configureStore({
  reducer: { user: useReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
