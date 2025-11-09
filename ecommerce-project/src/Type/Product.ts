export type ProductCardCart = {
    id: number;         // Identificador único del producto
  name: string;        // Nombre del producto
  price: number;       // Precio numérico del producto
  currency: string;    // Moneda (ej. "USD", "GLD")
  rating: number;      // Calificación (0 a 5)
  image: string;       // Ruta o URL de la imagen del producto
  description: string; // Descripción corta del producto
}