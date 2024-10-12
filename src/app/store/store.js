import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import levelsReducer from "./slices/levelsSlice";
import productsByLevelReducer from "./slices/productByLevelSlice";
import paymentReducer from "./slices/paymentSlice";
import userReducer from "./slices/userSlice";
import statisticReducer from "./slices/statisticSlice";
import myDonationsReducer from "./slices/myDonationsSlice";
import signupReducer from "./slices/signupSlice";
import categoryReducer from "./slices/categorySlice";
import productReducer from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    levels: levelsReducer,
    productsByLevel: productsByLevelReducer,
    payment: paymentReducer,
    user: userReducer,
    statistic: statisticReducer,
    myDonations: myDonationsReducer,
    signup: signupReducer,
    categories: categoryReducer,
    products: productReducer,
  },
});
export default store;
