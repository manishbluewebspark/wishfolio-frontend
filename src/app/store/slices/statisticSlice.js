"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Async thunk for fetching statistic data
export const fetchStatisticData = createAsyncThunk(
  "statistic/fetchStatisticData",
  async ({ id, userLevel }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/user/statistic/${id}/${userLevel}`
      );
      return response.data; // Assuming response contains statistic data
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

const statisticSlice = createSlice({
  name: "statistic",
  initialState: {
    statisticData: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    // Action to clear statistic data
    clearStatisticData: (state) => {
      state.statisticData = null; // Clear statistic data
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatisticData.pending, (state) => {
        state.isLoading = true; // Set loading to true
        state.error = null; // Clear any previous error
      })
      .addCase(fetchStatisticData.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading to false
        state.statisticData = action.payload; // Store the fetched statistic data
      })
      .addCase(fetchStatisticData.rejected, (state, action) => {
        state.isLoading = false; // Set loading to false
        // Handle error message
        state.error = action.payload || "Failed to fetch statistic data.";
      });
  },
});

// Export actions and reducers
export const { clearStatisticData } = statisticSlice.actions;
export default statisticSlice.reducer;
