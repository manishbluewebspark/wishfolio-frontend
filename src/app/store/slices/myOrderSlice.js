"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Async thunk for fetching user orders
export const fetchMyOrders = createAsyncThunk(
  "myOrder/fetchMyOrders",
  async ({ userId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/user/myOrders/${userId}?status=${status}` // Adjust the endpoint as necessary
      );
      return response.data; // Assuming response contains order data
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

const myOrderSlice = createSlice({
  name: "myOrder",
  initialState: {
    orderData: null, // Initial state for order data
    isLoading: false,
    error: null,
  },
  reducers: {
    // Action to clear order data
    clearOrderData: (state) => {
      state.orderData = null; // Clear order data
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrders.pending, (state) => {
        state.isLoading = true; // Set loading to true
        state.error = null; // Clear any previous error
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading to false
        state.orderData = action.payload; // Store the fetched order data
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.isLoading = false; // Set loading to false
        // Handle error message
        state.error = action.payload || "Failed to fetch order data.";
      });
  },
});

// Export actions and reducers
export const { clearOrderData } = myOrderSlice.actions;
export default myOrderSlice.reducer;
