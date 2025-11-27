import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from './App.tsx';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
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
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import ProfilePage from "./pages/ProfilePage.tsx";
import LogOutPage from "./pages/LogOutPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/signin" />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  }, 
  {
    path: "/signin",
    element: <SignInPage />,
  },

  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/piltover",
        element: <ProductPiltover />,
      },
      {
        path: "/product/:id",
        element: <ProductPiltoverBuy />,
      },
      {
        path: "/userprofile",
        element: <UserProfile />,
      },
      {
        path: "/productcart",
        element: <ProductCart />,
      },
      {
        path: "/chats",
        element: <ChatPage />,
      },
      {
        path: "/productedit",
        element: <ProductEdit />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/logout",
        element: <LogOutPage />,
      },
      {
        path: "/productform",
        element: <ProductForm />,
      },
    ],
  },

  {
    path: "*",
    element: <h1>404</h1>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </StrictMode>
);