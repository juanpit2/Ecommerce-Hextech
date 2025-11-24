import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../Type/ProductView";
import localProducts from "../components/data/products.json";

type ProductState = { items: Product[] };

const PLACEHOLDER = "/images/placeholder.png";

const normalize = (p: any): Product => ({
  id: p.id,
  name: p.name,
  price: p.price,
  currency: p.currency ?? "GLD",
  description: p.description ?? "",
  rating: p.rating ?? 5,

  image: p.image ?? p.images?.[0] ?? PLACEHOLDER,
  images: Array.isArray(p.images)
    ? p.images
    : (p.image ? [p.image] : []),

  category: p.category,
  tags: p.tags ?? [],
  colors: p.colors ?? [],

  materials: Array.isArray(p.materials) ? p.materials : [],
  features: Array.isArray(p.features) ? p.features : [],
  specification: p.specification ?? {},
});

const initialState: ProductState = {
  items: (localProducts as any[]).map(normalize),
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.items.push(normalize(action.payload));
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = normalize(action.payload);
      }
    },
    removeProduct(state, action: PayloadAction<number>) {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addProduct, updateProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
