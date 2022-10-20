import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import editService from "../services/editUser-service";

const initialState = {
  entryUser: null,
  loading: false,
};

export const editProfile = createAsyncThunk(
  "newProfile/setProfil",
  async ({ firstName, lastName }, thunkAPI) => {
    try {
      const data = await editService.putUser(firstName, lastName);
      return { user: data.data };
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const newUserSlice = createSlice({
  name: "newUser",
  initialState,
  reducers: {},
  extraReducers: {
    [editProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.entryUser = action.payload.entryUser;
    },
    [editProfile.rejected]: (state) => {
      state.loading = false;
    },
    [editProfile.pending]: (state) => {
      state.loading = true;
    },
  },
});
const { reducer } = newUserSlice;
export default reducer;
