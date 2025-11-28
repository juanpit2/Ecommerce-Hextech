// Configuracion del Store de Redux usando Redux Toolkit
// El store centraliza todo el estado global de la aplicacion
// Se divide en slices (partes) segun funcionalidad

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";

// Crear store con los reducers de cada slice
// cart: maneja el carrito de compras
// products: maneja el catalogo de productos
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
  },
});

// Tipos de TypeScript derivados del store
// RootState: tipo del estado completo (util para selectors)
export type RootState = ReturnType<typeof store.getState>;
// AppDispatch: tipo del dispatch (util para actions asincronas)
export type AppDispatch = typeof store.dispatch;
