import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import authentReducer from "./config/authentification";
const reducer = {
  auth: authentReducer,
};
const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
