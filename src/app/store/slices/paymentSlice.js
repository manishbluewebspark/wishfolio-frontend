import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    productId: null,
    userId: null,
    amount: null,
  },
  reducers: {
    storePaymentData: (state, action) => {
      state.productId = action.payload.productId;
      state.userId = action.payload.userId;
    },
    updateAmount: (state, action) => {
      state.amount = action.payload;
    },
  },
});

export const { storePaymentData, updateAmount } = paymentSlice.actions;

export default paymentSlice.reducer;
