import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import authentReducer from "./config/authentification";
import textReducer from "./config/message";

const reducer = {
  auth: authentReducer,
  message: textReducer,
};
const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
