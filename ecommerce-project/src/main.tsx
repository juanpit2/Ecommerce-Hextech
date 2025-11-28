// Punto de entrada principal de la aplicacion React
// Configuracion del router y providers globales

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from './App.tsx';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// Importacion de todas las paginas de la aplicacion
import Home from "./pages/Home.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import ProductPiltover from "./pages/ProductPitlover.tsx";
import ProductPiltoverBuy from "./pages/BuyProductPiltover.tsx";
import ProductCart from "./pages/ProductCart.tsx";
import UserProfile from "./pages/AccountPage.tsx";
import ChatPage from "./pages/ChatPage.tsx";
import ProductForm from "./pages/ProductPage.tsx";
import ProductEdit from "./pages/ProductEdit.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import LogOutPage from "./pages/LogOutPage.tsx";
import ReviewWindow from "./pages/ReviewPage.tsx";

// Providers y utilidades globales
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";


// Configuracion del router con todas las rutas de la aplicacion
// Estructura:
// - Rutas publicas: login, signin
// - Rutas protegidas: todas las demas (requieren autenticacion)
// - Redireccion inicial a signin
const router = createBrowserRouter([
  {
    // Ruta raiz redirige a signin
    path: "/",
    element: <Navigate to="/signin" />,
  },

  {
    // Pagina de inicio de sesion
    path: "/login",
    element: <LoginPage />,
  }, 
  {
    // Pagina de registro de usuario
    path: "/signin",
    element: <SignInPage />,
  },

  {
    // Grupo de rutas protegidas que requieren autenticacion
    // PrivateRoute valida que el usuario este autenticado
    element: <PrivateRoute />,
    children: [
      {
        // Pagina principal/home con productos destacados
        path: "/home",
        element: <Home />,
      },
      {
        // Catalogo de productos de Piltover
        path: "/piltover",
        element: <ProductPiltover />,
      },
      {
        // Detalle y compra de producto especifico (parametro dinamico :id)
        path: "/product/:id",
        element: <ProductPiltoverBuy />,
      },
      {
        // Perfil del usuario con datos personales
        path: "/userprofile",
        element: <UserProfile />,
      },
      {
        // Carrito de compras
        path: "/productcart",
        element: <ProductCart />,
      },
      {
        // Sistema de chat en tiempo real
        path: "/chats",
        element: <ChatPage />,
      },
      {
        // Edicion de productos existentes
        path: "/productedit",
        element: <ProductEdit />,
      },
      {
        // Configuracion de perfil del usuario
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        // Cerrar sesion
        path: "/logout",
        element: <LogOutPage />,
      },
      {
        // Formulario para crear nuevo producto
        path: "/productform",
        element: <ProductForm />,
      },
       {
        // Ventana de reseñas de productos
        path: "/ReviewWindow",
        element: <ReviewWindow/>,
      },
      
    ],
  },

  {
    // Ruta 404 para URLs no encontradas
    path: "*",
    element: <h1>404</h1>,
  },
]);


// Renderizado de la aplicacion en el DOM
// Se monta en el elemento con id="root" del index.html
// 
// Estructura de providers (de afuera hacia adentro):
// 1. StrictMode - Modo estricto de React para detectar problemas
// 2. Provider (Redux) - Provee el store global de Redux
// 3. AuthProvider - Provee contexto de autenticacion
// 4. RouterProvider - Maneja toda la navegacion de la app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </StrictMode>
);