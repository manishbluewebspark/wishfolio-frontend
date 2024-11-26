"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Async thunk for fetching user donations
export const fetchMyDonations = createAsyncThunk(
  "myDonations/fetchMyDonations",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/user/donations/${userId}` // Adjust the endpoint as necessary
      );
      return response.data; // Assuming response contains donations data
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

const myDonationsSlice = createSlice({
  name: "myDonations",
  initialState: {
    donationsData: null, // Initial state for donations data
    isLoading: false,
    error: null,
  },
  reducers: {
    // Action to clear donations data
    clearDonationsData: (state) => {
      state.donationsData = null; // Clear donations data
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyDonations.pending, (state) => {
        state.isLoading = true; // Set loading to true
        state.error = null; // Clear any previous error
      })
      .addCase(fetchMyDonations.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading to false
        state.donationsData = action.payload; // Store the fetched donations data
      })
      .addCase(fetchMyDonations.rejected, (state, action) => {
        state.isLoading = false; // Set loading to false
        // Handle error message
        state.error = action.payload || "Failed to fetch contributions data.";
      });
  },
});

// Export actions and reducers
export const { clearDonationsData } = myDonationsSlice.actions;
export default myDonationsSlice.reducer;
