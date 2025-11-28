# HEXTECH E-COMMERCE

Plataforma de e-commerce tematica inspirada en el universo de Arcane/League of Legends, desarrollada con React, TypeScript, Vite y Supabase.

## TABLA DE CONTENIDOS

- [Descripcion](#descripcion)
- [Tecnologias](#tecnologias)
- [Instalacion](#instalacion)
- [Comandos NPM](#comandos-npm)
- [Configuracion](#configuracion)
- [Estructura del Proyecto (Scaffolding)](#estructura-del-proyecto-scaffolding)
- [Caracteristicas](#caracteristicas)
- [Arquitectura](#arquitectura)
- [Base de Datos](#base-de-datos)

---

## DESCRIPCION

Hextech E-commerce es una aplicacion web moderna que simula una tienda online con productos tematicos del universo de Arcane. Incluye funcionalidades de autenticacion, gestion de productos, carrito de compras, sistema de reviews y chat en tiempo real.

---

## TECNOLOGIAS

### Frontend
- **React 19** - Libreria de UI
- **TypeScript 5.9** - Tipado estatico
- **Vite 7** - Build tool y dev server
- **TailwindCSS 4** - Framework de estilos
- **React Router DOM 7** - Navegacion
- **Redux Toolkit 2** - Gestion de estado global

### Backend / Database
- **Supabase** - Backend as a Service (BaaS)
  - PostgreSQL database
  - Authentication
  - Realtime subscriptions
  - Row Level Security (RLS)

### Desarrollo
- **ESLint 9** - Linter
- **TypeScript ESLint** - Reglas de linting para TS

---

## INSTALACION

### Prerequisitos
- Node.js >= 18.x
- npm o yarn
- Cuenta en Supabase (para base de datos)

### Pasos

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd ecommerce-project
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:

Crear archivo `.env` en la raiz del proyecto con:
```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

4. Ejecutar en modo desarrollo:
```bash
npm run dev
```

La aplicacion estara disponible en `http://localhost:5173`

---

## COMANDOS NPM

### `npm run dev`
Inicia el servidor de desarrollo con Hot Module Replacement (HMR).
- URL: http://localhost:5173
- Los cambios se reflejan automaticamente
- Ideal para desarrollo activo

### `npm run build`
Compila el proyecto para produccion.
- Ejecuta TypeScript compiler (`tsc -b`)
- Genera build optimizado con Vite
- Salida en carpeta `dist/`
- Minimiza y optimiza assets

### `npm run preview`
Previsualiza el build de produccion localmente.
- Sirve los archivos de `dist/`
- Util para probar antes de deployar
- Simula entorno de produccion

### `npm run lint`
Ejecuta ESLint para revisar el codigo.
- Detecta errores de sintaxis
- Valida reglas de estilo
- Identifica problemas de TypeScript
- Sugiere mejoras de codigo

---

## CONFIGURACION

### Variables de Entorno

El proyecto usa variables de entorno con prefijo `VITE_` para exponerlas al frontend:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-publica-anonima
```

**Importante:** El archivo `.env` debe estar en la raiz del proyecto, NO en `/src`

### Supabase Setup

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Obtener URL y Anon Key desde Project Settings > API
3. Configurar tablas segun el schema (ver seccion Base de Datos)
4. Habilitar Row Level Security (RLS)
5. Configurar politicas de acceso

---

## ESTRUCTURA DEL PROYECTO (SCAFFOLDING)

```
ecommerce-project/
├── public/                      # Archivos estaticos
│   └── images/                  # Imagenes e iconos
│       └── icons/
│
├── src/                         # Codigo fuente
│   │
│   ├── assets/                  # Assets del proyecto
│   │
│   ├── components/              # Componentes React
│   │   │
│   │   ├── common/              # Componentes reutilizables
│   │   │   ├── Button.tsx       # Boton generico
│   │   │   ├── Input.tsx        # Input generico
│   │   │   └── Loading.tsx      # Indicador de carga
│   │   │
│   │   ├── data/                # Datos JSON estaticos
│   │   │   ├── messages.json
│   │   │   ├── products.json
│   │   │   ├── productsLanding.json
│   │   │   ├── productsLandingDark.json
│   │   │   ├── productView.json
│   │   │   └── reviews.json
│   │   │
│   │   ├── features/            # Componentes por funcionalidad
│   │   │   │
│   │   │   ├── auth/            # Autenticacion
│   │   │   │   ├── LoginForm.tsx     # Formulario de login
│   │   │   │   ├── LogOut.tsx        # Cerrar sesion
│   │   │   │   └── SignInForm.tsx    # Registro de usuario
│   │   │   │
│   │   │   ├── chat/            # Chat en tiempo real
│   │   │   │   ├── ChatWindow.tsx    # Ventana principal de chat
│   │   │   │   └── MessageList.tsx   # Lista de mensajes
│   │   │   │
│   │   │   ├── products/        # Gestion de productos
│   │   │   │   ├── EditProduct.tsx          # Editar producto
│   │   │   │   ├── ProducCardCart.tsx       # Tarjeta para carrito
│   │   │   │   ├── ProductBenefits.tsx      # Beneficios del producto
│   │   │   │   ├── ProductCard.tsx          # Tarjeta de producto
│   │   │   │   ├── ProductCardLanding.tsx   # Tarjeta para landing
│   │   │   │   ├── ProductCardLandingDark.tsx  # Tarjeta oscura
│   │   │   │   ├── ProductForm.tsx          # Formulario de producto
│   │   │   │   ├── ProductGrid.tsx          # Grid de productos
│   │   │   │   └── ProductSection.tsx       # Seccion de producto
│   │   │   │
│   │   │   ├── reviews/         # Sistema de reviews
│   │   │   │   ├── ProductReviews.tsx         # Reviews de producto
│   │   │   │   ├── ProductReviewSection.tsx   # Seccion de reviews
│   │   │   │   ├── ReviewCard.tsx             # Tarjeta de review
│   │   │   │   ├── ReviewForm.tsx             # Formulario de review
│   │   │   │   ├── ReviewList.tsx             # Lista de reviews
│   │   │   │   └── ReviewWindow.tsx           # Ventana de reviews
│   │   │   │
│   │   │   └── user/            # Perfil de usuario
│   │   │       ├── Dashboard.tsx       # Dashboard del usuario
│   │   │       ├── ProfileScreen.tsx   # Pantalla de perfil
│   │   │       └── UserProfile.tsx     # Perfil de usuario
│   │   │
│   │   └── layout/              # Componentes de layout
│   │       ├── BannerPitlover.tsx   # Banner tematico
│   │       ├── Footer.tsx           # Pie de pagina
│   │       ├── Functionalities.tsx  # Seccion de funcionalidades
│   │       ├── Header.tsx           # Encabezado
│   │       ├── LandingCarousel.tsx  # Carrusel de landing
│   │       ├── Navigation.tsx       # Navegacion
│   │       ├── Sections.tsx         # Secciones tematicas
│   │       └── Zaun.tsx             # Seccion de Zaun
│   │
│   ├── context/                 # Contextos de React
│   │   └── AuthContext.tsx      # Contexto de autenticacion
│   │
│   ├── pages/                   # Paginas/Rutas
│   │   ├── AccountPage.tsx      # Pagina de cuenta
│   │   ├── BuyProductPiltover.tsx  # Compra de producto
│   │   ├── ChatPage.tsx         # Pagina de chat
│   │   ├── Home.tsx             # Pagina principal
│   │   ├── LoginPage.tsx        # Pagina de login
│   │   ├── LogOutPage.tsx       # Pagina de logout
│   │   ├── ProductCart.tsx      # Carrito de compras
│   │   ├── ProductEdit.tsx      # Edicion de producto
│   │   ├── ProductPage.tsx      # Pagina de producto
│   │   ├── ProductPitlover.tsx  # Productos de Piltover
│   │   ├── ProfilePage.tsx      # Pagina de perfil
│   │   ├── ReviewPage.tsx       # Pagina de reviews
│   │   └── SignInPage.tsx       # Pagina de registro
│   │
│   ├── routes/                  # Configuracion de rutas
│   │   └── PrivateRoute.tsx     # Rutas protegidas
│   │
│   ├── store/                   # Redux Store
│   │   ├── cartSlice.ts         # Estado del carrito
│   │   ├── chatSlice.ts         # Estado del chat
│   │   ├── hooks.ts             # Hooks tipados de Redux
│   │   ├── index.ts             # Exportaciones
│   │   ├── productSlice.ts      # Estado de productos
│   │   └── store.ts             # Configuracion del store
│   │
│   ├── Type/                    # Definiciones de tipos
│   │   ├── CartItem.ts          # Tipo de item del carrito
│   │   ├── Messages.ts          # Tipo de mensajes
│   │   ├── Product.ts           # Tipo de producto
│   │   ├── ProductView.ts       # Tipo de vista de producto
│   │   └── Reviews.ts           # Tipo de reviews
│   │
│   ├── utils/                   # Utilidades y servicios
│   │   ├── assetResolver.ts     # Resolucion de assets
│   │   ├── images.ts            # Helpers de imagenes
│   │   ├── messagesService.ts   # Servicio de mensajes
│   │   ├── productUpdateManager.ts  # Gestor de actualizaciones
│   │   ├── reviewsService.ts    # Servicio de reviews
│   │   └── supabaseClient.ts    # Cliente de Supabase
│   │
│   ├── App.css                  # Estilos globales
│   ├── App.tsx                  # Componente principal
│   ├── index.css                # Estilos base y Tailwind
│   ├── main.tsx                 # Punto de entrada
│   ├── FLUX_EN_EL_PROYECTO.md   # Documentacion de flujos
│   └── VALIDACIONES_Y_HELPERS.md  # Documentacion de validaciones
│
├── .env                         # Variables de entorno (no commitear)
├── .gitignore                   # Archivos ignorados por Git
├── eslint.config.js             # Configuracion de ESLint
├── index.html                   # HTML base
├── package.json                 # Dependencias y scripts
├── tsconfig.json                # Configuracion TypeScript
├── tsconfig.app.json            # Config TS para la app
├── tsconfig.node.json           # Config TS para Node
├── vite.config.ts               # Configuracion de Vite
└── README.md                    # Este archivo
```

---

## CARACTERISTICAS

### Autenticacion
- Registro de usuarios con Supabase Auth
- Login/Logout
- Sesiones persistentes
- Perfiles de usuario personalizados
- Proteccion de rutas

### Productos
- Catalogo de productos completo
- Detalle de producto con galeria de imagenes
- Especificaciones tecnicas
- Materiales y caracteristicas
- CRUD completo (admin)

### Carrito de Compras
- Agregar/quitar productos
- Ajustar cantidades
- Persistencia con Redux
- Calculo de totales
- Visualizacion responsive

### Reviews
- Crear reseñas por producto
- Calificacion con estrellas (1-5)
- Reviews anonimas o autenticadas
- Visualizacion en tiempo real
- Filtrado por producto

### Chat
- Multiples conversaciones
- Mensajes en tiempo real (Supabase Realtime)
- Crear/eliminar chats
- Interfaz tipo WhatsApp
- Historial de mensajes

### Responsive Design
- Optimizado para desktop
- Adaptado para tablets
- Totalmente funcional en moviles
- Breakpoints con Tailwind
- Imagenes responsive

---

## ARQUITECTURA

### Patron de Componentes

**Atomic Design modificado:**
- `common/` - Atomos (Button, Input, Loading)
- `features/` - Moleculas y organismos por dominio
  - auth: Autenticacion
  - chat: Mensajeria
  - products: Productos
  - reviews: Reseñas
  - user: Usuario
- `layout/` - Templates (Header, Footer, etc)
- `pages/` - Paginas completas

### Gestion de Estado

**Redux Toolkit** para estado global:
- `cartSlice` - Carrito de compras
- `chatSlice` - Mensajes locales  
- `productSlice` - Lista de productos

**React Context** para:
- Autenticacion (`AuthContext`)

**Estado local** con `useState` para:
- Formularios
- UI temporal
- Interacciones

### Capa de Servicios

Abstraccion de llamadas a Supabase:
- `supabaseClient.ts` - Cliente configurado
- `reviewsService.ts` - Operaciones de reviews
- `messagesService.ts` - Operaciones de chat
- `productUpdateManager.ts` - Gestor de eventos

### Rutas

**React Router DOM** con:
- Rutas publicas (/, /login, /signin)
- Rutas protegidas (`PrivateRoute`)
- Navegacion programatica
- Parametros dinamicos

---

## BASE DE DATOS

### Schema de Supabase

#### Tabla: `auth.users` (gestionada por Supabase)
- `id` (UUID) - Primary Key
- `email` - Email del usuario
- `created_at` - Fecha de registro
- `user_metadata` - Metadata adicional (username, etc)

#### Tabla: `profiles`
Extiende auth.users con informacion adicional
- `id` (UUID) - Primary Key, Foreign Key → auth.users.id
- `email` (text)
- `username` (text)
- `stay_signed_in` (boolean)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Relacion:** 1:1 con auth.users

#### Tabla: `products`
- `id` (integer) - Primary Key
- `name` (text)
- `price` (numeric)
- `currency` (text)
- `description` (text)
- `rating` (numeric)
- `image` (text) - URL imagen principal
- `images` (jsonb) - Array de imagenes
- `category` (text)
- `tags` (text[])
- `colors` (text[])
- `materials` (text[])
- `features` (text[])
- `specification` (jsonb)
- `created_at` (timestamp)

**Relacion:** 1:N con reviews

#### Tabla: `reviews`
- `id` (UUID) - Primary Key
- `product_id` (integer) - Foreign Key → products.id (nullable)
- `user_id` (UUID) - Foreign Key → auth.users.id (nullable)
- `user_name` (text)
- `rating` (numeric)
- `comment` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Relaciones:** 
- N:1 con products
- N:1 con auth.users (opcional, permite reviews anonimas)

#### Tabla: `users_chats`
- `id` (UUID) - Primary Key
- `user_id` (UUID) - Foreign Key → auth.users.id
- `chat_name` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Relaciones:**
- N:1 con auth.users
- 1:N con messages

#### Tabla: `messages`
- `id` (UUID) - Primary Key
- `chat_id` (UUID) - Foreign Key → users_chats.id
- `sender_id` (UUID) - Foreign Key → auth.users.id
- `sender_name` (text)
- `message_text` (text)
- `created_at` (timestamp)

**Relaciones:**
- N:1 con users_chats
- N:1 con auth.users

### Row Level Security (RLS)

Politicas configuradas:

**Para users_chats:**
```sql
-- Solo el propietario puede ver sus chats
CREATE POLICY "Users can view own chats"
  ON users_chats FOR SELECT
  USING (auth.uid() = user_id);

-- Solo el propietario puede crear chats
CREATE POLICY "Users can create own chats"
  ON users_chats FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Solo el propietario puede eliminar sus chats
CREATE POLICY "Users can delete own chats"
  ON users_chats FOR DELETE
  USING (auth.uid() = user_id);
```

**Para messages:**
```sql
-- Los usuarios pueden ver mensajes de chats que les pertenecen
CREATE POLICY "Users can view messages from own chats"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users_chats 
      WHERE id = messages.chat_id 
      AND user_id = auth.uid()
    )
  );

-- Los usuarios pueden crear mensajes en sus chats
CREATE POLICY "Users can create messages in own chats"
  ON messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users_chats 
      WHERE id = messages.chat_id 
      AND user_id = auth.uid()
    )
  );
```

**Para reviews:**
```sql
-- Todos pueden leer reviews
CREATE POLICY "Anyone can read reviews"
  ON reviews FOR SELECT
  USING (true);

-- Usuarios autenticados pueden crear reviews
CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
```

**Para products:**
```sql
-- Todos pueden leer productos
CREATE POLICY "Anyone can read products"
  ON products FOR SELECT
  USING (true);

-- Solo admins pueden modificar productos
CREATE POLICY "Admins can manage products"
  ON products FOR ALL
  USING (auth.role() = 'admin');
```

### Realtime

Subscripciones activas en:
- `reviews` - Nuevas reseñas (INSERT events)
- `messages` - Nuevos mensajes en chat (INSERT events filtrados por chat_id)

Uso en codigo:
```typescript
// Suscribirse a reviews
const subscription = supabase
  .channel('public:reviews')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'reviews' },
    (payload) => {
      // Manejar nueva review
    }
  )
  .subscribe();

// Suscribirse a mensajes de un chat
const subscription = supabase
  .channel(`messages:${chatId}`)
  .on('postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `chat_id=eq.${chatId}`
    },
    (payload) => {
      // Manejar nuevo mensaje
    }
  )
  .subscribe();
```

---

## DESARROLLO

### Buenas Practicas

1. **Componentes funcionales** con hooks
2. **TypeScript estricto** para type safety
3. **Props tipadas** en todos los componentes
4. **Servicios reutilizables** para logica de negocio
5. **Responsive first** con Tailwind
6. **Comentarios descriptivos** sin tildes

### Flujo de Trabajo

1. Crear rama para nueva feature
2. Desarrollar con `npm run dev`
3. Verificar con `npm run lint`
4. Probar build con `npm run build`
5. Revisar preview con `npm run preview`
6. Commit y push

### Testing

Pendiente: Implementar tests con Vitest/Jest

### Deploy

Recomendado: Vercel, Netlify o similar
1. Configurar variables de entorno en plataforma
2. Conectar repositorio
3. Deploy automatico en cada push

---

## LICENCIA

Proyecto educativo - Diseño de Algoritmos

---

## CONTACTO

Para dudas o contribuciones, contactar al equipo de desarrollo.
