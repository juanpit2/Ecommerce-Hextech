import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.tsx'
import LoginPage from './pages/LoginPage.tsx'
import SignInPage from './pages/SignInPage.tsx'
import BuyProductPiltover from './pages/BuyProductPiltover.tsx'
import './App.css'


const Routes=createBrowserRouter([
  {
  path: '/',
  element: <Navigate to="/SignIn" />,
   
},
  {
  path: '/home',
  element: <BuyProductPiltover/>, 
},{
  path: '/Login',
  element: <LoginPage/>
},{
  path: '/SignIn',
  element: <SignInPage/>,
  index: true,
},
{
path: '*',
element: <h1>404</h1>
 
}])



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={Routes} />
  </StrictMode>,
)
