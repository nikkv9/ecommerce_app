import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    cartQuantity: 0,
    total: 0,
  },

  reducers: {
    addToCart: (state, action) => {
      state.products.push(action.payload);
      state.cartQuantity += 1;
      state.total += action.payload.price * action.payload.quantity;
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
