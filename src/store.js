import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import authentReducer from "./config/authentification";
import profileReducer from "./config/User-slice";
const reducer = {
  auth: authentReducer,
  profile: profileReducer,
};
const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
