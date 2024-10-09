import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Define an async thunk to fetch products by level
export const fetchProductsByLevel = createAsyncThunk(
  "products/fetchProductsByLevel",
  async (levelId) => {
    const response = await axios.get(
      `${API_BASE_URL}/product/productByLevel?levelId=${levelId}`
    ); // Example endpoint
    return response.data.data; // Return the products data
  }
);
// Create a slice for products by level
const productsByLevelSlice = createSlice({
  name: "productsByLevel",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // Store fetched products
      })
      .addCase(fetchProductsByLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Handle error
      });
  },
});

// Export the reducer
export default productsByLevelSlice.reducer;
