'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://13.53.166.146:4000/api/auth/login', loginData);
      // Assuming the response has a `token` and `user` field
      console.log(response.data)
      return response.data; 
    } catch (error) {
      // Return the error message or status if available
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); // Remove token on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // Ensure that `action.payload` contains the user and token
        state.user = action.payload.user || null;
        state.token = action.payload.token || null;
        // Store token in localStorage if available
        if (action.payload.token) {
          localStorage.setItem('token', action.payload.token);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        // Handle error message
        state.error = action.payload || 'Login failed. Please try again.';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
