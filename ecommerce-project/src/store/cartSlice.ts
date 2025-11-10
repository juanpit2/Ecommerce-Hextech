import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export type CartItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  quantity: number;
  image: string;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existing = state.items.find((x) => x.id === item.id);

      if (existing) {
        existing.quantity += item.quantity; 
      } else {
        state.items.push({ ...item });
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((x) => x.id !== action.payload);
    },

    increaseQty: (state, action: PayloadAction<number>) => {
      const item = state.items.find((x) => x.id === action.payload);
      if (item) item.quantity++;
    },

    decreaseQty: (state, action: PayloadAction<number>) => {
      const item = state.items.find((x) => x.id === action.payload);
      if (item && item.quantity > 1) item.quantity--;
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty } = cartSlice.actions;
export default cartSlice.reducer;
