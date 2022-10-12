import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/auth-service";

const user = JSON.parse(localStorage.getItem("user"));

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password);
      // return { user: data };
    } catch (error) {
      return thunkAPI.rejectWithValue();
      // need to add the error if the network doesnt work
      //
    }
  }
);

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    // needs a pending state and action.

    //and needs a rejection state and action.
  },
});
const { reducer } = authSlice;
export default reducer;
