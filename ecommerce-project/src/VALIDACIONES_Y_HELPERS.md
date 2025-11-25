# Resumen de Validaciones y Helpers en el Proyecto

Este documento describe todas las validaciones implementadas en el proyecto, así como los helpers y utilidades que apoyan dichas validaciones y el manejo de datos, especialmente para imágenes.

---

## 1. Validaciones en Formularios

### a) `src/components/features/auth/SignInForm.tsx`
- **Validaciones en `handleSubmit`:**
  - El email debe contener "@".
  - Las contraseñas deben coincidir.
  - La contraseña debe tener al menos 6 caracteres.
  - El email no debe estar ya registrado (verifica en localStorage).
  - Muestra mensajes de error específicos para cada caso.

### b) `src/components/features/auth/LoginForm.tsx`
- **Validaciones en `handleSubmit`:**
  - El email y la contraseña deben coincidir con un usuario registrado (verifica en localStorage).
  - Si no coinciden, muestra "Invalid email or password".
  - Los campos de email y password son requeridos (atributo `required` en el input).

### c) `src/components/features/reviews/ReviewForm.tsx`
- **Validaciones en `handleSubmit`:**
  - El nombre no puede estar vacío.
  - La reseña debe tener al menos 10 caracteres.
  - La calificación debe estar entre 1 y 5.
  - Muestra mensajes de error específicos para cada caso.

### d) `src/components/features/products/ProductForm.tsx` y `EditProduct.tsx`
- **Validaciones en `submit`:**
  - Los campos `name`, `price`, `currency` y `category` son obligatorios. Si falta alguno, muestra un alert.
  - Al agregar tags, colores, materiales y features, se evita agregar duplicados o valores vacíos.
  - Al agregar especificaciones, tanto la clave como el valor deben ser no vacíos.
  - Al cargar imágenes, solo se aceptan archivos cuyo tipo comience con `image/`.
  - Solo se permite un máximo de 6 imágenes.

- **Validaciones mínimas adicionales:**
  - Inputs con `required` en los formularios de login y registro.
  - Conversión y control de tipos para campos numéricos (`price`, `rating`).

---

## 2. Helpers y Utilidades Relacionadas

### a) `src/components/features/products/ProductForm.tsx` y `EditProduct.tsx`
- **`fileToBase64(file: File): Promise<string>`**
  - Convierte archivos de imagen a Base64 para su previsualización y almacenamiento.
- **`pushUnique(arr: string[], v: string)`**
  - Añade elementos a arrays (tags, colores, etc.) evitando duplicados y vacíos.

### b) `src/utils/images.ts`
- **`PLACEHOLDER`**
  - Ruta de imagen por defecto.
- **`fixSrc(src: string)`**
  - Normaliza rutas de imágenes, soporta base64 y URLs absolutas.
- **`firstImage(p: { image?: string; images?: string[] })`**
  - Devuelve la primera imagen válida de un producto, usando el placeholder si no hay.

### c) `src/utils/assetResolver.ts`
- **`resolveImage(path?: string): string`**
  - Resuelve rutas de imágenes usando Vite y rutas relativas.
- **`resolveImages(paths?: string[]): string[]`**
  - Resuelve múltiples rutas de imágenes, usando el placeholder si no hay válidas.

---

Estos helpers facilitan la validación, carga, previsualización y normalización de imágenes y datos relacionados en los formularios y vistas del proyecto.
