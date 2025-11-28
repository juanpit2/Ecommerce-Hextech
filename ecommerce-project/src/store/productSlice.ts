// Slice de Redux para Productos
// Maneja el catalogo de productos: agregar, editar, eliminar
// Carga productos iniciales desde JSON local

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../Type/ProductView";
import localProducts from "../components/data/products.json";

// Tipo del estado del slice
type ProductState = { items: Product[] };

// Placeholder para productos sin imagen
const PLACEHOLDER = "/images/placeholder.png";

// Funcion helper para normalizar productos
// Asegura que todos los campos tengan valores por defecto
// Transforma datos de diferentes fuentes a un formato consistente
const normalize = (p: any): Product => ({
  id: p.id,
  name: p.name,
  price: p.price,
  currency: p.currency ?? "GLD",      // Moneda por defecto: GLD
  description: p.description ?? "",
  rating: p.rating ?? 5,              // Rating por defecto: 5 estrellas

  // Normalizacion de imagenes
  // image: imagen principal (primer elemento de images o placeholder)
  image: p.image ?? p.images?.[0] ?? PLACEHOLDER,
  // images: array de imagenes (asegurar que sea array)
  images: Array.isArray(p.images)
    ? p.images
    : (p.image ? [p.image] : []),

  category: p.category,
  tags: p.tags ?? [],                 // Tags vacios si no existen
  colors: p.colors ?? [],             // Colores vacios si no existen

  // Asegurar que arrays complejos siempre sean arrays
  materials: Array.isArray(p.materials) ? p.materials : [],
  features: Array.isArray(p.features) ? p.features : [],
  specification: p.specification ?? {},  // Especificaciones vacias si no existen
});

// Estado inicial: cargar productos desde JSON local
// Todos los productos se normalizan antes de guardar
const initialState: ProductState = {
  items: (localProducts as any[]).map(normalize),
};

// Crear slice con reducers para CRUD de productos
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Agregar nuevo producto al catalogo
    addProduct(state, action: PayloadAction<Product>) {
      state.items.push(normalize(action.payload));
    },
    // Actualizar producto existente por ID
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = normalize(action.payload);
      }
    },
    // Eliminar producto por ID
    removeProduct(state, action: PayloadAction<number>) {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
  },
});

// Exportar acciones para usar en componentes
export const { addProduct, updateProduct, removeProduct } = productSlice.actions;
// Exportar reducer para incluir en el store
export default productSlice.reducer;
