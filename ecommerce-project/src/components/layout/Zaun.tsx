// Importación de imágenes utilizadas en la sección de Zaun
import jinxL from "../../../public/images/icons/Jinx Zaum Landing.svg";
import jinxZ from "../../../public/images/icons/Jinx Zaun Product.svg";
import minigun from "../../../public/images/icons/Minigun Zaum.svg";

// Importación del componente de tarjeta de producto y datos JSON
import ProductCardLandingDark from "../../components/features/products/ProductCardLandingDark";
import productsDark from "../../components/data/productsLandingDark.json";

// Componente principal de la sección de Zaun
export default function ZaunLayout() {
  return (
    <>
      <div>
        {/* Imagen de encabezado superior */}
        <div>
          <img
            src={jinxL}
            alt=""
            className="w-full object-cover block rounded-t-2xl"
          />
        </div>

        {/* Sección principal con fondo oscuro y bordes redondeados */}
        <section className="w-full -mt-24 bg-[#000A14] rounded-t-3xl rounded-b-3xl shadow-lg overflow-hidden max-sm:-mt-12 max-sm:rounded-t-2xl max-sm:rounded-b-2xl">
          <div className="max-w-7xl mx-auto px-6 md:px-10 pt-28 md:pt-32 pb-16 space-y-12 max-sm:px-3 max-sm:pt-16 max-sm:pb-8 max-sm:space-y-6">

            {/* Bloque de productos recientes */}
            <div className="space-y-6 max-sm:space-y-3">
              <h2 className="text-white/90 text-2xl font-bold mb-6 max-sm:text-lg max-sm:mb-3">
                Recently added
              </h2>

              {/* 
                Grid de productos: 
                - En móvil (default): 2 columnas 
                - En desktop (md): 4 columnas 
                - gap reducido en móvil y mayor en escritorio
              */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 justify-items-center max-sm:gap-1.5">
                {productsDark.map((p) => (
                  <ProductCardLandingDark key={p.id} product={p} />
                ))}
              </div>
            </div>

            {/* Bloque de productos destacados */}
            <div className="space-y-6 max-sm:space-y-3">
              <h2 className="text-white/90 text-2xl font-bold mb-6 max-sm:text-lg max-sm:mb-3">
                Feature products
              </h2>

              {/* 
                Layout adaptable:
                - En móvil: 2 columnas compactas
                - En desktop: diseño extendido con 3 columnas
              */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 max-sm:gap-1.5">
                
                {/* Imagen principal de Jinx */}
                <div className="col-span-1 md:col-span-2 rounded-2xl overflow-hidden max-sm:rounded-lg">
                  <img
                    src={jinxZ}
                    alt="Jinx Product"
                    className="w-full h-[220px] md:h-[470px] object-cover rounded-xl max-sm:h-[160px] max-sm:rounded-lg"
                  />
                </div>

                {/* Imagen secundaria de la Minigun */}
                <div className="col-span-1 rounded-2xl bg-[#071226] p-2 md:p-4 flex items-center justify-center max-sm:rounded-lg max-sm:p-1">
                  <img
                    src={minigun}
                    alt="Minigun"
                    className="h-[220px] md:h-[470px] object-contain rounded-xl max-sm:h-[160px] max-sm:rounded-lg"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </>
  );
}
