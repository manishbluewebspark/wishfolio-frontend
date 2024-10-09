"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Async thunk for fetching user data
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token from local storage
        },
      });
      return response.data; // Assuming response contains user data
    } catch (error) {
      // Return the error message or status if available
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.message || error.response.data
        );
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearUserData: (state) => {
      state.userData = null; // Clear user data
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true; // Set loading to true
        state.error = null; // Clear any previous error
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading to false
        state.userData = action.payload; // Store the fetched user data
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false; // Set loading to false
        // Handle error message
        state.error = action.payload || "Failed to fetch user data.";
      });
  },
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;
