import axios from "axios";
import authHeader from "../services/auth-nav";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  entryUser: null,
  loading: false,
};

export const getProfile = createAsyncThunk(
  "profile/getProfil",
  async (thunkAPI) => {
    const res = await axios({
      url: "http://localhost:3001/api/v1/user/profile",
      method: "post",
      headers: authHeader(),
    });
    return res.data;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: {
    [getProfile.pending]: (state) => {
      state.loading = true;
    },
    [getProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.entryUser = action.payload;
    },
    [getProfile.rejected]: (state) => {
      state.loading = false;
    },
  },
});
const { reducer } = profileSlice;
export default reducer;
