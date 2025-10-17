import viF from "../../../public/images/icons/Functionalities Vi.svg"
import jinxF from "../../../public/images/icons/Functionalities Jinx.svg"
import caitF from "../../../public/images/icons/Functionalities Cait.svg"
import ekkoF from "../../../public/images/icons/Functionalities Ekko.svg"

export default function Functionalities() {
    return(
        <>
            <div className="relative flex items-center justify-center gap-5">
                <div>
                    <img src={viF} alt="" className="mx-auto block object-contain max-w-full
                    max-sm:max-w-[120px] max-sm:max-h-[120px] transform transition-transform duration-200 ease-in-out hover:scale-105 focus-visible:scale-105 cursor-pointer"/>
                </div>
                <div className="mt-12">
                    <img src={jinxF} alt="" className="mx-auto block object-contain max-w-full
                    max-sm:max-w-[120px] max-sm:max-h-[120px] transform transition-transform duration-200 ease-in-out hover:scale-105 focus-visible:scale-105 cursor-pointer"/>
                </div>
                <div>
                    <img src={caitF} alt="" className="mx-auto block object-contain max-w-full
                    max-sm:max-w-[120px] max-sm:max-h-[120px] transform transition-transform duration-200 ease-in-out hover:scale-105 focus-visible:scale-105 cursor-pointer"/>
                </div>
                <div className="mt-12">
                    <img src={ekkoF} alt="" className="mx-auto block object-contain max-w-full
                    max-sm:max-w-[120px] max-sm:max-h-[120px] transform transition-transform duration-200 ease-in-out hover:scale-105 focus-visible:scale-105 cursor-pointer"/>
                </div>
            </div>
        </>
    )
}