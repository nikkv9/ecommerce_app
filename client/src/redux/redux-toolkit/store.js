import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-redux";
import userReducer from "./user-redux";
import productReducer from "./product-redux";

export const Store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    product: productReducer,
  },
});
