// Sistema de eventos para notificar cambios en productos
type ProductUpdateListener = (productId: number) => void;

class ProductUpdateManager {
  private listeners: ProductUpdateListener[] = [];

  subscribe(listener: ProductUpdateListener) {
    this.listeners.push(listener);
    
    // Retorna función para unsubscribe
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyUpdate(productId: number) {
    this.listeners.forEach(listener => listener(productId));
  }
}

export const productUpdateManager = new ProductUpdateManager();