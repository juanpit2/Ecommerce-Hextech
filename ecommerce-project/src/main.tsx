import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./App.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ProductPitlover from './pages/ProductPitlover.tsx'

const Routes=createBrowserRouter([{
  path: '/',
  element: <ProductPitlover/>,
},
])



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={Routes} />
  </StrictMode>,
)
