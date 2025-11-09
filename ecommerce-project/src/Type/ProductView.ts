// src/Type/ProductView.ts
export type Product = {
  id: number;
  name: string;
  price: number;
  currency: string;
  description: string;
  category: string;
  tags: string[];
  colors: string[];
  images: string[];
  materials: string[];
  features: string[];
  // Si quieres ser estricto y evitar el error, usa | undefined:
  specification: Record<string, string | undefined>;
};
