import React from "react";

// Pie de página con enlaces, redes sociales y notas legales
const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2C5E90] text-white py-10 px-6 mt-20 rounded-t-3xl">
      {/* Contenedor principal responsivo:
         - En móvil: disposición en columna
         - En desktop: fila con espacio entre bloques */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
        
        {/* Marca / Logo */}
        <div>
          <h2 className="text-xl font-bold tracking-wider">HEXTECH</h2>
        </div>

        {/* Navegación secundaria */}
        <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-medium">
          <a href="#" className="hover:underline">Terms & Conditions</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Team</a>
        </div>

        {/* Redes sociales (íconos SVG inline para evitar dependencias externas) */}
        <div className="flex gap-4">
          {/* Facebook */}
          <a href="#" className="hover:opacity-80 transition" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.333v21.333C0 23.403.597 24 1.325 24h11.495v-9.294H9.692V11.01h3.128V8.412c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.142v3.24h-1.918c-1.505 0-1.796.716-1.796 1.765v2.317h3.59l-.467 3.696h-3.123V24h6.116C23.403 24 24 23.403 24 22.667V1.333C24 .597 23.403 0 22.675 0z" />
            </svg>
          </a>

          {/* Twitter */}
          <a href="#" className="hover:opacity-80 transition" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557a9.83 9.83 0 01-2.828.775A4.932 4.932 0 0023.337 3a9.864 9.864 0 01-3.127 1.195A4.916 4.916 0 0016.616 3c-2.73 0-4.943 2.214-4.943 4.943 0 .388.044.765.127 1.126C7.728 8.86 4.1 6.887 1.671 3.884a4.933 4.933 0 00-.666 2.482c0 1.71.87 3.216 2.19 4.098a4.897 4.897 0 01-2.237-.616v.062c0 2.388 1.697 4.382 3.946 4.833a4.936 4.936 0 01-2.229.085c.629 1.962 2.445 3.389 4.6 3.429A9.868 9.868 0 010 19.54a13.936 13.936 0 007.548 2.212c9.056 0 14.01-7.506 14.01-14.01 0-.213-.005-.425-.014-.636A10.025 10.025 0 0024 4.557z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a href="#" className="hover:opacity-80 transition" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14C2.238 0 0 2.238 0 5v14c0 2.762 2.238 5 5 5h14c2.761 0 5-2.238 5-5V5c0-2.762-2.239-5-5-5zM8.339 19.337H5.671V9h2.668v10.337zM7.005 7.792a1.545 1.545 0 110-3.09 1.545 1.545 0 010 3.09zM19.337 19.337h-2.668v-5.064c0-1.208-.022-2.76-1.682-2.76-1.684 0-1.941 1.316-1.941 2.676v5.148H10.38V9h2.561v1.407h.037c.357-.675 1.229-1.386 2.531-1.386 2.708 0 3.207 1.782 3.207 4.099v6.217z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Separador visual */}
      <div className="border-t border-white/30 my-6"></div>

      {/* Bloque legal / disclaimers */}
      <div className="max-w-4xl mx-auto text-center text-sm text-gray-200 leading-relaxed">
        <p className="font-semibold mb-2">HEXTECH | All rights reserved</p>
        <p>
          This marketplace offers fictional Hextech and Zaunite products inspired by Arcane.
          All items displayed are conceptual and for entertainment purposes only.
          Prices, specifications, and color variations are part of a creative experience
          and should not be considered real-world offers.
        </p>
        <p className="mt-2">
          HexTech is not responsible for any misuse of Zaunite technology.
          Observe all effects in a controlled environment caused by unstable hextech crystals.
          Handle all products responsibly and consult a Piltover specialist before attempting
          to integrate Hextech into daily life.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
