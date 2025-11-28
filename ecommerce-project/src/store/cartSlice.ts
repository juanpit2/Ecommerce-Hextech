// Slice de Redux para el Carrito de Compras
// Maneja el estado del carrito: agregar, quitar, modificar cantidades
// Usa Redux Toolkit para simplificar la configuracion

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


// Tipo para un item individual en el carrito
export type CartItem = {
  id: number;           // ID unico del producto
  name: string;         // Nombre del producto
  description: string;  // Descripcion corta
  price: number;        // Precio unitario
  currency: string;     // Moneda (GLD, USD, etc)
  quantity: number;     // Cantidad en el carrito
  image: string;        // URL de la imagen
};

// Tipo del estado del slice
type CartState = {
  items: CartItem[];    // Array de productos en el carrito
};

// Estado inicial del carrito (vacio al iniciar)
const initialState: CartState = {
  items: [],
};

// Crear slice con reducers (acciones que modifican el estado)
export const cartSlice = createSlice({
  name: "cart",  // Nombre del slice (para debugging)
  initialState,
  reducers: {
    // Agregar producto al carrito
    // Si ya existe, incrementa la cantidad
    // Si no existe, lo agrega como nuevo item
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existing = state.items.find((x) => x.id === item.id);

      if (existing) {
        // Producto ya existe: sumar cantidades
        existing.quantity += item.quantity; 
      } else {
        // Producto nuevo: agregar al array
        state.items.push({ ...item });
      }
    },

    // Remover producto del carrito por ID
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((x) => x.id !== action.payload);
    },

    // Incrementar cantidad de un producto en 1
    increaseQty: (state, action: PayloadAction<number>) => {
      const item = state.items.find((x) => x.id === action.payload);
      if (item) item.quantity++;
    },

    // Decrementar cantidad de un producto en 1
    // No permite bajar de 1 (usar removeFromCart para eliminar)
    decreaseQty: (state, action: PayloadAction<number>) => {
      const item = state.items.find((x) => x.id === action.payload);
      if (item && item.quantity > 1) item.quantity--;
    },
  },
});

// Exportar acciones para usar en componentes
// Ejemplo: dispatch(addToCart(product))
export const { addToCart, removeFromCart, increaseQty, decreaseQty } = cartSlice.actions;

// Exportar reducer para incluir en el store
export default cartSlice.reducer;
