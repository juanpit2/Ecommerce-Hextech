// Importación de las imágenes principales para las secciones
import { NavLink } from "react-router-dom";
import piltover from "../../../public/images/icons/Piltover Section.svg";
import zaun from "../../../public/images/icons/Section Zaun.svg";

// Componente principal que muestra dos secciones visuales (Piltover y Zaun)
export default function Sections() {
  return (
    <>
      {/* Contenedor principal que organiza las dos imágenes */}
      <div
        className="
          relative flex items-center justify-center gap-10
          max-sm:flex-col max-sm:gap-3 max-sm:justify-center max-sm:items-center max-sm:px-4
        "
      >
        {/* 
          - En pantallas grandes: las imágenes se colocan lado a lado con separación horizontal (gap-10).
          - En pantallas pequeñas: se apilan verticalmente y se centran (flex-col).
        */}

        {/* Sección de Piltover */}
        <NavLink to="/Piltover">
          <div className="w-[480px] md:w-[560px] lg:w-[640px] max-sm:w-full max-sm:max-w-[340px]">
            <img
              src={piltover}
              alt="Piltover Section"
              className="
                mx-auto block object-cover rounded-2xl max-sm:rounded-xl
                w-full h-auto
                transform transition-transform duration-200 ease-in-out
                hover:scale-105 focus-visible:scale-105 cursor-pointer
              "
            />
            {/* 
              - mx-auto: centra horizontalmente la imagen
              - object-cover: mantiene proporción al llenar el contenedor
              - rounded-2xl: bordes redondeados
              - hover:scale-105: efecto de zoom suave al pasar el cursor
            */}
          </div>
        </NavLink>
        {/* Sección de Zaun */}
        <div className="w-[480px] md:w-[560px] lg:w-[640px] max-sm:w-full max-sm:max-w-[340px]">
          <img
            src={zaun}
            alt="Zaun Section"
            className="
              mx-auto block object-cover rounded-2xl max-sm:rounded-xl
              w-full h-auto
              transform transition-transform duration-200 ease-in-out
              hover:scale-105 focus-visible:scale-105 cursor-pointer
            "
          />
          {/* 
            - Mismo comportamiento visual y responsivo que la imagen de Piltover.
            - Las clases permiten mantener consistencia visual entre ambas secciones.
          */}
        </div>
      </div>
    </>
  );
}
