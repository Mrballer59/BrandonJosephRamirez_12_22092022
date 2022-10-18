import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import authentReducer from "./config/authentification";
import profileReducer from "./config/User-slice";
import newUserSlice from "./config/New-User";
const reducer = {
  auth: authentReducer,
  profile: profileReducer,
  newUser: newUserSlice,
};
const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
