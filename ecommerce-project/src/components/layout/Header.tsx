// Importación de íconos SVG usados en la barra de navegación
import cart from "../../../public/images/icons/Cart Large Minimalistic.svg"
import persona from "../../../public/images/icons/Vector Icono Persona.svg"

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

          {/* LEFT: menus (desktop) */}
          <div className="flex-1 hidden md:flex items-center justify-start">
            <div className="flex items-center text-gray-700 font-medium gap-12 pl-2">
              {/* Products - disabled dropdown (kept as simple link/label) */}
              <NavLink to="/piltover" className="inline-flex items-center gap-2 hover:text-purple-300 transition-colors duration-300 ease-in-out">
                <span className="font-semibold">Products</span>
              </NavLink>

              {/* Piltover - disabled dropdown (kept as simple link/label) */}
              <NavLink to="/piltover" className="inline-flex items-center gap-2 hover:text-purple-300 transition-colors duration-300 ease-in-out">
                <span className="font-semibold">Piltover</span>
              </NavLink>

            </div>
          </div>

          {/* CENTER: marca centrada */}
          <div className="flex-none flex items-center justify-center">
            <NavLink to="/home">
              <div className="text-2xl font-bold text-gray-800 hover:text-yellow-500 transition-colors duration-300 ease-in-out">
                HEXTECH
              </div>
            </NavLink>
          </div>

          {/* RIGHT: icons and mobile button */}
          <div className="flex-1 flex items-center justify-end gap-8 pr-2">
            <div className="hidden md:flex items-center gap-5">
              <NavLink to="/ProductCart">
                <img src={cart} alt="Cart" />
              </NavLink>
              <NavLink to="/UserProfile">
                <img src={persona} alt="Account" />
              </NavLink>
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
        </div>

        {/* Panel desplegable móvil: mantenemos menús para móvil, eliminamos buscador */}
        <div
          ref={mobileRef}
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${mobileOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-white">
            {/* Secciones desplegables (móvil) */}
            <div className="space-y-2">
              <NavLink to="/piltover" className="block py-2 font-semibold text-gray-800">Products</NavLink>

              <NavLink to="/piltover" className="block py-2 font-semibold text-gray-800">Piltover</NavLink>
               
            </div>

            {/* Íconos de carrito y usuario en móvil */}
            <div className="flex items-center gap-5 pt-3">
              <NavLink to="/ProductCart">
                <img src={cart} alt="Cart" className="h-6 w-auto" />
              </NavLink>
              <NavLink to="/UserProfile">
                <img src={persona} alt="Account" className="h-6 w-auto" />
              </NavLink>
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
