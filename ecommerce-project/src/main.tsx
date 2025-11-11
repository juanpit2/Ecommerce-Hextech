import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

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
import ReviewWindow from './components/features/reviews/ReviewWindow'
import App from "./App.tsx";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/SignIn" />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/Login",
    element: <LoginPage />,
  },
  {
    path: "/SignIn",
    element: <SignInPage />,
    index: true,
  },
  {
    path: "/Piltover",
    element: <ProductPiltover />,
  },
  {
    path: "/Product/:id",
    element: <ProductPiltoverBuy />,
  },
  {
    path: "/UserProfile",
    element: <UserProfile />,
  },
  {
    path: "/ProductCart",
    element: <ProductCart />,
  },
  {
    path: "/Chats",
    element: <ChatPage />,
  },
  {
    path: "/ProductEdit",
    element: <ProductEdit />,
  },
  {
    path: "/ProductForm",
    element: <ProductForm />,
  },
  {
    path: "/ReviewWindow",
    element: <ReviewWindow />,
  },
  {
    path: "*",
    element: <h1>404</h1>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={Routes} />
    </Provider>
  </StrictMode>
);
