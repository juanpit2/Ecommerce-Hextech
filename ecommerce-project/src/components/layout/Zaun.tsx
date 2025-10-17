import jinxL from "../../../public/images/icons/Jinx Zaum Landing.svg"
import jinxZ from "../../../public/images/icons/Jinx Zaun Product.svg"
import minigun from "../../../public/images/icons/Minigun Zaum.svg"
import ProductCardLandingDark from "../../components/features/products/ProductCardLandingDark";
import productsDark from "../../components/data/productsLandingDark.json";

export default function ZaunLayout() {
  return (
    <>
      <div>
        {/* Imagen superior */}
        <div>
          <img
            src={jinxL}
            alt=""
            className="w-full object-cover block rounded-t-2xl"
          />
        </div>

        {/* Sección oscura con bordes redondeados abajo */}
        <section className="w-full -mt-24 bg-[#000A14] rounded-t-3xl rounded-b-3xl shadow-lg overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-10 pt-28 md:pt-32 pb-16 space-y-12">
            
            {/* Recently added */}
            <div className="space-y-6">
              <h2 className="text-white/90 text-sm md:text-base font-medium">
                Recently added
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {productsDark.map((p) => (
                  <ProductCardLandingDark key={p.id} product={p} />
                ))}
              </div>
            </div>

            {/* Feature products */}
            <div className="space-y-6">
              <h2 className="text-white/90 text-sm md:text-base font-medium">
                Feature products
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Imagen de Jinx */}
                <div className="md:col-span-2 rounded-2xl overflow-hidden">
                  <img
                    src={jinxZ}
                    alt="Jinx Product"
                    className="w-full h-[470px] object-cover"
                  />
                </div>

                {/* Imagen de la Minigun */}
                <div className="rounded-2xl bg-[#071226] p-4 flex items-center justify-center">
                  <img
                    src={minigun}
                    alt="Minigun"
                    className="h-[470px] object-contain rounded-xl"
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
