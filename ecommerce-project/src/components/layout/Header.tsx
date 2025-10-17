import cart from "../../../public/images/icons/Cart Large Minimalistic.svg"
import piquito from "../../../public/images/icons/Vector piquito.svg"
import persona from "../../../public/images/icons/Vector Icono Persona.svg"
import lupa from "../../../public/images/icons/startContent.svg"
import { useState, useRef, useEffect } from "react"
import { NavLink } from "react-router-dom"

function Navbar() {
  const [productsOpen, setProductsOpen] = useState(false)
  const productsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
  function onDocClick(e: MouseEvent) {
    if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
      setProductsOpen(false)
    }
  }
  document.addEventListener("mousedown", onDocClick)
  return () => document.removeEventListener("mousedown", onDocClick)}, [])

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo */}    
          <div className="flex space-x-1.5 gap-13">
              <div className="text-2xl font-bold text-gray-800 hover:text-yellow-500
              transition-colors duration-300 ease-in-out">
              HEXTECH
              </div>  
              {/* Menú */}
              <div className="flex items-center">
                <div className="flex space-x-1.5 text-gray-700 font-medium gap-12">
                  <details className="relative">
                    <summary className="inline-flex items-center gap-2 cursor-pointer hover:text-purple-300 transition-colors duration-300 ease-in-out list-none">
                      <span className="font-semibold">Products</span>
                      <img src={piquito} alt="" className="w-3 h-3 self-center object-contain mt-0.5 align-middle" />
                    </summary>
                    <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-200 shadow-md rounded-md py-1 z-50">
                        <NavLink to={"/weapons"} >
                      <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Weapons</p>
                      </NavLink>
                       <NavLink to={"/Technology"} >
                      <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Technology</a>
                      </NavLink>
                      <NavLink to={"/Materials"} >
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Materials</a>
                      </NavLink>
                      <NavLink to={"/Books"} >
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Books</a>
                      </NavLink>
                    </div>
                  </details>

                  <details className="relative">
                    <summary className="inline-flex items-center gap-2 cursor-pointer hover:text-purple-300 transition-colors duration-300 ease-in-out list-none">
                      <span className="font-semibold">Piltover</span>
                      <img src={piquito} alt="" className="w-3 h-3 self-center object-contain mt-0.5 align-middle" />
                    </summary>
                    <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-200 shadow-md rounded-md py-1 z-50">
                       <NavLink to={"/weaponsPitlover"} >
                      <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Weapons</p>
                      </NavLink>
                       <NavLink to={"/TechnologyPitlover"} >
                      <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Technology</a>
                      </NavLink>
                      <NavLink to={"/MaterialsPitlover"} >
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Materials</a>
                      </NavLink>
                      <NavLink to={"/BooksPitlover"} >
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Books</a>
                      </NavLink>
                    </div>
                  </details>

                  <details className="relative">
                    <summary className="inline-flex items-center gap-2 cursor-pointer hover:text-purple-300 transition-colors duration-300 ease-in-out list-none">
                      <span className="font-semibold">Zaun</span>
                      <img src={piquito} alt="" className="w-3 h-3 self-center object-contain mt-0.5 align-middle" />
                    </summary>
                    <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-200 shadow-md rounded-md py-1 z-50">
                      <NavLink to={"/weaponsZaun"} >
                      <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Weapons</p>
                      </NavLink>
                       <NavLink to={"/TechnologyZaun"} >
                      <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Technology</a>
                      </NavLink>
                      <NavLink to={"/MaterialsZaun"} >
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Materials</a>
                      </NavLink>
                      <NavLink to={"/BooksZaun"} >
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Books</a>
                      </NavLink>
                    </div>
                  </details>
                </div>
              </div>
          </div>
          {/* Buscador */}
          <div className="flex space-x-1.5 gap-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="border border-gray- rounded-2xl pl-10 pr-4 py-2 w-140 flex-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <img src={lupa} alt="Search icon" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            
            <div className="flex space-x-1.5 gap-5">
              <NavLink to={"/persona"} >
                <div className="self-center object-contain"> <img src={cart} alt="" /></div>
                </NavLink>
                <NavLink to={"/persona"} >
                
                <div className="self-center object-contain"> <img src={persona} alt="" /></div>
                </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
