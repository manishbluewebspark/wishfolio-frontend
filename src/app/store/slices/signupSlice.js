import { createSlice } from "@reduxjs/toolkit";

const signupSlice = createSlice({
  name: "signup",
  initialState: {
    email: null, // Stores email entered by the user
    otp: null, // Stores OTP entered for verification
    mobile: null, // Stores mobile number entered by the user
    name: null, // Stores user's name
    address: null, // Stores user's address
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    setMobile: (state, action) => {
      state.mobile = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    resetSignup: (state) => {
      state.email = null;
      state.otp = null;
      state.mobile = null;
      state.name = null;
      state.address = null;
    },
  },
});

export const { setEmail, setOtp, setMobile, setName, setAddress, resetSignup } =
  signupSlice.actions;

export default signupSlice.reducer;
