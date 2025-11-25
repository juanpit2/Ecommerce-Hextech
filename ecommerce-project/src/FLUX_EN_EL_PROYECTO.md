# Uso de la Metodología de Diseño Flux en el Proyecto

Este documento explica cómo se implementó la metodología Flux en el proyecto y en qué casos se utilizó para la gestión del estado y el flujo de datos.

---

## ¿Qué es Flux?
Flux es una arquitectura de diseño para aplicaciones web que facilita el flujo unidireccional de datos. Sus componentes principales son:
- **Actions:** Objetos que describen eventos o intenciones del usuario.
- **Dispatcher:** Canal central que distribuye las acciones a los stores (en Redux, el store cumple este rol).
- **Stores:** Gestionan el estado y la lógica de la aplicación.
- **Views:** Componentes de UI que reaccionan a los cambios de estado.

En este proyecto, la implementación de Flux se realiza principalmente a través de **Redux**.

---

## Implementación de Flux en el Proyecto

### 1. Estructura de Carpetas Relacionada
- `src/store/`: Contiene los slices de Redux (stores), hooks y la configuración del store global.
- `src/components/`: Contiene los componentes de UI (Views) que interactúan con el store.

### 2. Casos de Uso de Flux/Redux

#### a) Gestión de Productos
- **Archivos:**
  - `src/store/productSlice.ts`
  - `src/components/features/products/ProductForm.tsx`, `EditProduct.tsx`, `ProductGrid.tsx`, etc.
- **Cómo se usa:**
  - Los formularios de productos despachan acciones (`addProduct`, `updateProduct`, `removeProduct`) al store de productos.
  - El estado de los productos se almacena en el store y se accede mediante hooks (`useAppSelector`).
  - Los componentes de UI se actualizan automáticamente cuando el estado cambia.

#### b) Gestión del Carrito
- **Archivos:**
  - `src/store/cartSlice.ts`
  - `src/components/features/products/ProductCard.tsx`, `ProductCart.tsx`, etc.
- **Cómo se usa:**
  - Al agregar o quitar productos del carrito, se despachan acciones (`addToCart`, `removeFromCart`).
  - El estado del carrito se mantiene centralizado y reactivo.

#### c) Gestión de Chat y Reviews
- **Archivos:**
  - `src/store/chatSlice.ts`, `src/store/productSlice.ts` (para reviews)
  - `src/components/features/chat/ChatWindow.tsx`, `MessageList.tsx`, `ReviewList.tsx`, etc.
- **Cómo se usa:**
  - El estado de los mensajes y reviews se gestiona en los stores correspondientes.
  - Los componentes de chat y reviews leen y actualizan el estado mediante acciones y selectores.

### 3. Hooks Personalizados
- **Archivo:** `src/store/hooks.ts`
- **Descripción:**
  - Proporciona hooks personalizados (`useAppDispatch`, `useAppSelector`) para facilitar el acceso y la manipulación del store desde los componentes.

---

## Beneficios Obtenidos
- **Flujo de datos predecible y unidireccional.**
- **Centralización del estado** para facilitar el mantenimiento y la escalabilidad.
- **Actualización reactiva de la UI** ante cambios en el estado global.

---

## Resumen
La metodología Flux, implementada mediante Redux, se utiliza en el proyecto para gestionar el estado de productos, carrito, chat y reviews, asegurando un flujo de datos claro y predecible entre los componentes y el store global.
