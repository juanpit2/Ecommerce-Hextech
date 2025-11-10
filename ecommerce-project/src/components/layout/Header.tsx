// Importación de íconos SVG usados en la barra de navegación
import cart from "../../../public/images/icons/Cart Large Minimalistic.svg"
import piquito from "../../../public/images/icons/Vector piquito.svg"
import persona from "../../../public/images/icons/Vector Icono Persona.svg"
import lupa from "../../../public/images/icons/startContent.svg"

// Importación de hooks de React para manejo de estado, referencias y efectos
import { useState, useRef, useEffect } from "react"
import { NavLink } from "react-router-dom"

function Navbar() {
  // Estado que controla si el menú móvil está abierto o cerrado
  const [mobileOpen, setMobileOpen] = useState(false)

  // Referencia al contenedor del panel móvil para detectar clics fuera de él
  const mobileRef = useRef<HTMLDivElement | null>(null)

  // Hook que cierra el panel móvil si el usuario hace clic fuera de su área
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) {
        setMobileOpen(false)
      }
    }
    document.addEventListener("mousedown", onDocClick)
    return () => document.removeEventListener("mousedown", onDocClick)
  }, [])

  return (
    <>
      {/* Barra de navegación fija en la parte superior */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        
        {/* Contenedor principal de la barra */}
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3">
          
          {/* Sección izquierda: logo y menú en desktop */}
          <div className="flex items-center gap-3">

            {/* Logo del sitio */}
            <NavLink to="/home">
              <div className="text-2xl font-bold text-gray-800 hover:text-yellow-500 transition-colors duration-300 ease-in-out">
                HEXTECH
              </div>
            </NavLink>

            {/* Menú visible solo en pantallas grandes */}
            <div className="hidden md:block">
              <div className="flex items-center">
                <div className="flex items-center text-gray-700 font-medium gap-12">
                  
                  {/* Menú desplegable de "Products" */}
                  <details className="relative">
                    <summary className="inline-flex items-center gap-2 cursor-pointer hover:text-purple-300 transition-colors duration-300 ease-in-out list-none">
                      <span className="font-semibold">Products</span>
                      <img src={piquito} alt="" className="w-3 h-3 object-contain" />
                    </summary>
                    {/* Submenú */}
                    <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-200 shadow-md rounded-md py-1 z-50">
                      <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Weapons</a>
                      <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Technology</a>
                      <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Materials</a>
                      <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Books</a>
                    </div>
                  </details>

                  {/* Menú "Piltover" */}
                  <details className="relative">
                    <summary className="inline-flex items-center gap-2 cursor-pointer hover:text-purple-300 transition-colors duration-300 ease-in-out list-none">
                      <span className="font-semibold">Piltover</span>
                      <img src={piquito} alt="" className="w-3 h-3 object-contain" />
                    </summary>
                    <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-200 shadow-md rounded-md py-1 z-50">
                      <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Weapons</a>
                      <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Technology</a>
                      <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Materials</a>
                      <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Books</a>
                    </div>
                  </details>

                  {/* Menú "Zaun" */}
                  <details className="relative">
                    <summary className="inline-flex items-center gap-2 cursor-pointer hover:text-purple-300 transition-colors duration-300 ease-in-out list-none">
                      <span className="font-semibold">Zaun</span>
                      <img src={piquito} alt="" className="w-3 h-3 object-contain" />
                    </summary>
                    <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-200 shadow-md rounded-md py-1 z-50">
                      <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Weapons</a>
                      <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Technology</a>
                      <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Materials</a>
                      <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Books</a>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>

          {/* Sección central/derecha (solo visible en desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {/* Campo de búsqueda */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="border rounded-2xl pl-10 pr-4 py-2 w-140 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <img src={lupa} alt="Search icon" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Íconos de carrito y usuario */}
            <div className="flex items-center gap-5">
              <NavLink to="/ProductCart">
                <img src={cart} alt="Cart" />
              </NavLink>
              <NavLink to="/UserProfile">
                <img src={persona} alt="Account" />
              </NavLink>
            </div>
          </div>

          {/* Botón hamburguesa (solo móvil) */}
          <div className="flex md:hidden items-center gap-3">
            <button
              className="p-2 rounded-lg border border-gray-200 active:scale-95"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {/* Icono de menú (3 líneas) */}
              <div className="w-5 h-0.5 bg-gray-800 mb-1"></div>
              <div className="w-5 h-0.5 bg-gray-800 mb-1"></div>
              <div className="w-4 h-0.5 bg-gray-800 ml-1"></div>
            </button>
          </div>
        </div>

        {/* Panel desplegable móvil */}
        <div
          ref={mobileRef}
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${mobileOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-white">
            
            {/* Buscador dentro del panel móvil */}
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Search"
                className="w-full border rounded-2xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <img src={lupa} alt="Search icon" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Secciones desplegables */}
            <div className="space-y-2">
              {/* Products */}
              <details>
                <summary className="flex items-center justify-between py-2 font-semibold text-gray-800 cursor-pointer">
                  Products <img src={piquito} alt="" className="w-3 h-3" />
                </summary>
                <div className="pl-3 pb-2">
                  <a href="#" className="block py-1 text-sm text-gray-700">Weapons</a>
                  <a href="#" className="block py-1 text-sm text-gray-700">Technology</a>
                  <a href="#" className="block py-1 text-sm text-gray-700">Materials</a>
                  <a href="#" className="block py-1 text-sm text-gray-700">Books</a>
                </div>
              </details>

              {/* Piltover */}
              <details>
                <summary className="flex items-center justify-between py-2 font-semibold text-gray-800 cursor-pointer">
                  Piltover <img src={piquito} alt="" className="w-3 h-3" />
                </summary>
                <div className="pl-3 pb-2">
                  <a href="#" className="block py-1 text-sm text-gray-700">Weapons</a>
                  <a href="#" className="block py-1 text-sm text-gray-700">Technology</a>
                  <a href="#" className="block py-1 text-sm text-gray-700">Materials</a>
                  <a href="#" className="block py-1 text-sm text-gray-700">Books</a>
                </div>
              </details>

              {/* Zaun */}
              <details>
                <summary className="flex items-center justify-between py-2 font-semibold text-gray-800 cursor-pointer">
                  Zaun <img src={piquito} alt="" className="w-3 h-3" />
                </summary>
                <div className="pl-3 pb-2">
                  <a href="#" className="block py-1 text-sm text-gray-700">Weapons</a>
                  <a href="#" className="block py-1 text-sm text-gray-700">Technology</a>
                  <a href="#" className="block py-1 text-sm text-gray-700">Materials</a>
                  <a href="#" className="block py-1 text-sm text-gray-700">Books</a>
                </div>
              </details>
            </div>

            {/* Íconos de carrito y usuario en móvil */}
            <div className="flex items-center gap-5 pt-3">
              <img src={cart} alt="Cart" className="h-6 w-auto" />
              <img src={persona} alt="Account" className="h-6 w-auto" />
            </div>
          </div>
        </div>
      </nav>

      {/* Espaciador que evita que el contenido quede cubierto por la navbar fija */}
      <div className="h-16 md:h-[72px]" />
    </>
  )
}

export default Navbar
