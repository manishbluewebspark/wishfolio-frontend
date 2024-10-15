"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchAddresses = createAsyncThunk(
  "addresses/fetchAddresses",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/user/address/${userId}`
      );
      return response.data;
    } catch (error) {
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

const addressSlice = createSlice({
  name: "addresses",
  initialState: {
    addressData: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearAddressData: (state) => {
      state.addressData = [];
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchAddresses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressData = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload || "Failed to fetch address data.";
      });
  },
});

export const { clearAddressData } = addressSlice.actions;
export default addressSlice.reducer;
