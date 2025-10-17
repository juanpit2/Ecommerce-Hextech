import jinxL from "../../../public/images/icons/Jinx Zaum Landing.svg"
import jinxZ from "../../../public/images/icons/Jinx Zaun Product.svg"
import minigun from "../../../public/images/icons/Minigun Zaum.svg"

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

                {/* Recuadro negro */}
                <div className="w-full -mt-24 bg-[#000A14] rounded-t-3xl p-8 md:p-16 shadow-lg min-h-[700px] flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
                    
                    {/* Imagen de Jinx (misma altura que la minigun) */}
                    <img
                        src={jinxZ}
                        alt="Jinx Product"
                        className="h-[470px] object-cover rounded-2xl"
                    />

                    {/* Imagen de la Minigun (misma altura que Jinx) */}
                    <img
                        src={minigun}
                        alt="Minigun"
                        className="h-[470px] object-contain rounded-2xl"
                    />
                </div>
            </div>
        </>
    )
}
