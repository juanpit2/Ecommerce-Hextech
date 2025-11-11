

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import chatReducer from "./chatSlice";
import reviewReducer from "./reviewSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    chat: chatReducer,
    reviews: reviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;