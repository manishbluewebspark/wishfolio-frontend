"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Async thunk for fetching user wishes
export const fetchMyWish = createAsyncThunk(
  "myWish/fetchMyWish",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/user/myWish/${userId}` // Adjust the endpoint as necessary
      );
      return response.data; // Assuming response contains wish data
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

const myWishSlice = createSlice({
  name: "myWish",
  initialState: {
    wishData: null, // Initial state for wish data
    isLoading: false,
    error: null,
  },
  reducers: {
    // Action to clear wish data
    clearWishData: (state) => {
      state.wishData = null; // Clear wish data
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyWish.pending, (state) => {
        state.isLoading = true; // Set loading to true
        state.error = null; // Clear any previous error
      })
      .addCase(fetchMyWish.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading to false
        state.wishData = action.payload; // Store the fetched wish data
      })
      .addCase(fetchMyWish.rejected, (state, action) => {
        state.isLoading = false; // Set loading to false
        // Handle error message
        state.error = action.payload || "Failed to fetch wish data.";
      });
  },
});

// Export actions and reducers
export const { clearWishData } = myWishSlice.actions;
export default myWishSlice.reducer;
