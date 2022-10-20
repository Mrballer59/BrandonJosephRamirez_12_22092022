import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/auth-service";

//getting the user and storing it in the locaalStorage
const user = JSON.parse(localStorage.getItem("user"));

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password);
      return { user: data };
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);
//logout part export to the right page
export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    rememberMe: (state) => {
      state.isLoggedIn = true;
    },
  },

  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});
const { reducer, actions } = authSlice;
export const { rememberMe } = actions;
export default reducer;
