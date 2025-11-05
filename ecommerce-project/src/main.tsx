import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.tsx'
import LoginPage from './pages/LoginPage.tsx'
import SignInPage from './pages/SignInPage.tsx'

const Routes=createBrowserRouter([{
  path: '/',
  element: <Home/>,
},{
  path: '/',
  element: <LoginPage/>,
  index: true
},{
  path: '/',
  element: <SignInPage/>,
}])



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={Routes} />
  </StrictMode>,
)
