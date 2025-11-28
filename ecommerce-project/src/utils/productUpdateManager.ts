// Gestor de actualizaciones de productos - Patron Observer
// Sistema de eventos simple para notificar cambios en productos
// Permite que multiples componentes reaccionen a actualizaciones sin acoplamiento

// Tipo de funcion que escucha actualizaciones (recibe ID del producto modificado)
type ProductUpdateListener = (productId: number) => void;

// Clase que implementa el patron Observer para productos
class ProductUpdateManager {
  // Array de funciones suscritas que seran notificadas
  private listeners: ProductUpdateListener[] = [];

  // Suscribir un listener para recibir notificaciones
  // Parametro: listener - Funcion que se ejecutara al actualizar un producto
  // Retorna: Funcion para cancelar la suscripcion (cleanup)
  subscribe(listener: ProductUpdateListener) {
    this.listeners.push(listener);
    
    // Retorna funcion de cleanup para remover el listener
    // Util en useEffect cleanup o componentWillUnmount
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notificar a todos los listeners que un producto fue actualizado
  // Parametro: productId - ID del producto que cambio
  // Todos los listeners recibiran este ID y podran reaccionar
  notifyUpdate(productId: number) {
    this.listeners.forEach(listener => listener(productId));
  }
}

// Exportar instancia singleton del gestor
// Se usa la misma instancia en toda la aplicacion
export const productUpdateManager = new ProductUpdateManager();