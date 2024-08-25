// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface CartItem {
//   id: string;
//   title: string;
//   img: string;
//   location: string;
//   price: number;
//   quantity: number; // Add quantity field
// }

// interface CartState {
//   items: CartItem[];
// }

// const initialState: CartState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart(state, action: PayloadAction<CartItem>) {
//       const item = state.items.find((item) => item.id === action.payload.id);
//       if (item) {
//         item.quantity += action.payload.quantity;
//       } else {
//         state.items.push(action.payload);
//       }
//     },
//     removeFromCart(state, action: PayloadAction<string>) {
//       state.items = state.items.filter((item) => item.id !== action.payload);
//     },
//     updateQuantity(state, action: PayloadAction<{ id: string; change: number }>) {
//       const { id, change } = action.payload;
//       const item = state.items.find((item) => item.id === id);
//       if (item) {
//         item.quantity = Math.max(1, item.quantity + change); // Ensure quantity is at least 1
//       }
//     },
//   },
// });

// export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { RootState } from "./store";

interface CartItem {
  id: string;
  title: string;
  img: string;
  location: string;
  price: number;
  quantity: number; // Add quantity field
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; change: number }>
    ) {
      const { id, change } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = Math.max(1, item.quantity + change); // Ensure quantity is at least 1
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// Selectors
const TAX_RATE = 0.08; // 8% tax rate
const SERVICE_FEE = 200; // Fixed service fee
const DISCOUNT = 0; // Discount amount (if any)

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectTotalPrice = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const selectTax = createSelector(
  [selectTotalPrice],
  (totalPrice) => totalPrice * TAX_RATE
);

export const selectFinalPrice = createSelector(
  [selectTotalPrice, selectTax],
  (totalPrice, tax) => totalPrice + tax + SERVICE_FEE - DISCOUNT
);
