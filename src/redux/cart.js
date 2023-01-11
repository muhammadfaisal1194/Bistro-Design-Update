// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

const initialCart = () => {
  const item = window.localStorage.getItem("cart");
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : [];
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: initialCart(),
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
      localStorage.setItem("cart", JSON.stringify(action.payload));
    },
    increaseCartItemQuantity: (state, action) => {
      let cartItems = state.cart;
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i]._id === action.payload) {
          cartItems[i].quantity += 1;
        }
      }
      state.cart = cartItems;
    },
    decreaseCartItemQuantity: (state, action) => {
      let cartItems = state.cart;
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i]._id === action.payload) {
          if (cartItems[i].quantity !== 0) {
            cartItems[i].quantity -= 1;
          }
        }
      }
      state.cart = cartItems;
    },
  },
});

export const {
  setCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
