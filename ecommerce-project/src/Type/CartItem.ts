export type CartItem = {
  id: number;           // Identificador único
  name: string;         // Nombre del producto
  description: string;  // Descripción corta
  quantity: number;     // Cantidad en el carrito
  price: number;        // Precio unitario
  currency: 'GLD';      // Moneda (en tu caso, fija a GLD)
};
