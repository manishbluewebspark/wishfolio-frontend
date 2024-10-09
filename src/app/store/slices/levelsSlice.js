import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Define an async thunk to fetch levels
export const fetchLevels = createAsyncThunk("levels/fetchLevels", async () => {
  const response = await axios.get(`${API_BASE_URL}/level/all`); // Use axios to fetch data
  return response.data.data;
});

// Create a slice for levels
const levelsSlice = createSlice({
  name: "levels",
  initialState: {
    levels: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLevels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLevels.fulfilled, (state, action) => {
        state.loading = false;
        state.levels = action.payload; // Store fetched levels
      })
      .addCase(fetchLevels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Handle error
      });
  },
});

// Export the reducer
export default levelsSlice.reducer;
