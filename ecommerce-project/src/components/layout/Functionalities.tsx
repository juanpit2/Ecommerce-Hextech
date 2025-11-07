// Importación de las imágenes SVG que representan cada funcionalidad
import viF from "../../../public/images/icons/Functionalities Vi.svg"
import jinxF from "../../../public/images/icons/Functionalities Jinx.svg"
import caitF from "../../../public/images/icons/Functionalities Cait.svg"
import ekkoF from "../../../public/images/icons/Functionalities Ekko.svg"

// Componente funcional principal que muestra una sección de funcionalidades
export default function Functionalities() {
  return (
    <>
      {/* --- VISTA MÓVIL (< md) --- 
        - Se muestra solo en pantallas pequeñas (oculta en desktop gracias a "md:hidden").
        - Organiza los elementos en una cuadrícula de 2 columnas y 2 filas (2x2).
        - Las imágenes se agrandan y se reduce el espacio vertical para un diseño compacto.
      */}
      <div className="md:hidden">
        <div className="grid grid-cols-2 gap-x-1 gap-y-0.5 justify-items-center">
          
          {/* Imagen de Vi */}
          <img
            src={viF}
            alt="Vi Functionalities"
            className="block object-contain w-[150px] h-auto"
          />

          {/* Imagen de Jinx */}
          <img
            src={jinxF}
            alt="Jinx Functionalities"
            className="block object-contain w-[150px] h-auto"
          />

          {/* Imagen de Caitlyn */}
          <img
            src={caitF}
            alt="Caitlyn Functionalities"
            className="block object-contain w-[150px] h-auto"
          />

          {/* Imagen de Ekko */}
          <img
            src={ekkoF}
            alt="Ekko Functionalities"
            className="block object-contain w-[150px] h-auto"
          />
        </div>
      </div>

      {/* --- VISTA ESCRITORIO (>= md) ---
        - Se activa únicamente en pantallas medianas y grandes ("hidden md:flex").
        - Muestra las imágenes alineadas en una fila horizontal.
        - Se añade un efecto hover que amplía ligeramente la imagen al pasar el cursor.
      */}
      <div className="hidden md:flex md:items-center md:justify-center md:gap-5">

        {/* Imagen de Vi */}
        <div>
          <img
            src={viF}
            alt="Vi Functionalities"
            className="
              mx-auto block object-contain max-w-full
              transform transition-transform duration-200 ease-in-out
              hover:scale-105 focus-visible:scale-105 cursor-pointer
            "
          />
        </div>

        {/* Imagen de Jinx (ligeramente desplazada hacia abajo con mt-12 para dinamismo visual) */}
        <div className="mt-12">
          <img
            src={jinxF}
            alt="Jinx Functionalities"
            className="
              mx-auto block object-contain max-w-full
              transform transition-transform duration-200 ease-in-out
              hover:scale-105 focus-visible:scale-105 cursor-pointer
            "
          />
        </div>

        {/* Imagen de Caitlyn */}
        <div>
          <img
            src={caitF}
            alt="Caitlyn Functionalities"
            className="
              mx-auto block object-contain max-w-full
              transform transition-transform duration-200 ease-in-out
              hover:scale-105 focus-visible:scale-105 cursor-pointer
            "
          />
        </div>

        {/* Imagen de Ekko (también con desplazamiento vertical para simetría con Jinx) */}
        <div className="mt-12">
          <img
            src={ekkoF}
            alt="Ekko Functionalities"
            className="
              mx-auto block object-contain max-w-full
              transform transition-transform duration-200 ease-in-out
              hover:scale-105 focus-visible:scale-105 cursor-pointer
            "
          />
        </div>
      </div>
    </>
  )
}

