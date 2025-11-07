import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./App.css";
import "./App.tsx";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ProductZaun from './pages/ProductZaun'

const Routes=createBrowserRouter([{
  path: '/',
  element: <ProductZaun/>,
},
])



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={Routes} />
  </StrictMode>,
)
