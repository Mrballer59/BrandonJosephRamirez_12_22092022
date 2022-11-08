import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

//initialize token from local storage
const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;
//console.log(token)

const initialState = {
  isError: null,
  isSuccess: false,
  isLoading: false,
  token,
  firstName: "",
  lastName: "",
  rememberMe: false,
};

// Login user : login  appelle le service login
export const login = createAsyncThunk(
  "au,th/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      //console.log(email, password)
      return await authService.login({ email, password });
    } catch (error) {
      const msg =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();

      return rejectWithValue(msg);
    }
  }
);
// createAsyncThunk for middleware for get data of User's Profile
//profile user
export const userProfile = createAsyncThunk(
  "auth/userProfile",
  async (profileData, { getState, rejectWithValue }) => {
    try {
      //console.log(getState())
      const token = getState().auth.token;
      return await authService.userProfile(profileData, token);
    } catch (error) {
      const msg =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return rejectWithValue(msg);
    }
  }
);

//update user profile data
export const updateUserData = createAsyncThunk(
  "auth/updateUserData",
  async (newData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      return await authService.updateUserData(newData, token);
    } catch (error) {
      const msg =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

//And also to ensure the operation of the "Remember me" mode.
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.clear();
      state.isLoading = false;
      state.token = null;
      state.isError = null;
      state.firstName = "";
      state.lastName = "";
      state.isSuccess = false;
      state.rememberMe = false;
    },
    //Switch to "Logged in" mode

    isRememberMe: (state, { payload }) => {
      state.rememberMe = payload;
    },
  },
  //In our case, asynchronous actions.

  extraReducers: (builder) => {
    builder
      //login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.token = payload.body.token;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })

      //user profile
      .addCase(userProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = null;
        state.firstName = payload.firstName;
        state.lastName = payload.lastName;
      })
      .addCase(userProfile.rejected, (state) => {
        state.isLoading = false;
      })

      //update profile
      // slice, which content reducers and actions for data of the User's
      //Profil and status of loading
      // after the updating
      .addCase(updateUserData.pending, (state) => {
        state.isLoading = true;
        state.firstName = "";
        state.lastName = "";
      })
      .addCase(updateUserData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.firstName = payload.firstName;
        state.lastName = payload.lastName;
        state.isError = null;
      })
      .addCase(updateUserData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      });
  },
});

export const { logout, isRememberMe } = authSlice.actions;
export default authSlice.reducer;
