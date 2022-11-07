import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";

const reducer = {
  auth: authReducer,
};

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: true,
});

export default store;
