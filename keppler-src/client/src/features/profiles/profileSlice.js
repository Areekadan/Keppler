import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileAPI from "./profileAPI";
import { logout } from "../auth/authSlice";

const initialState = {
  profile: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getProfile = createAsyncThunk(
  "profile/getMe",
  async (_, thunkAPI) => {
    try {
      return await profileAPI.getProfile();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateMe",
  async ({ username, profileData }, thunkAPI) => {
    try {
      const response = await profileAPI.updateProfile(username, profileData);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload.profile;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.profile = {};
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.profile = {};
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = "";
      });
  },
});

export const { reset } = profileSlice.actions;
export default profileSlice.reducer;
