export type Product = {
  id: number;
  name: string;
  price: number;
  currency?: string;
  description?: string;

  // imágenes
  image?: string;        
  images?: string[];    

  // meta opcional
  rating?: number;
  category?: string;
  tags?: string[];
  colors?: string[];

  // secciones opcionales
  materials?: string[];
  features?: string[];
  specification?: Record<string, string | undefined>;
};
