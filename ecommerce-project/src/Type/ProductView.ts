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
  specification: Record<string, string | undefined>;
};
