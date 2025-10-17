import piltover from "../../../public/images/icons/Piltover Section.svg"
import zaun from "../../../public/images/icons/Section Zaun.svg" 
import { NavLink } from "react-router-dom"   

export default function Sections() {
    return(
        <>
            <div className="relative flex items-center justify-center gap-7">
                <NavLink to={"/sectionPitlover"} >
                <div>
                    <img src={piltover} alt="" className="mx-auto block object-contain max-w-full
                    max-sm:max-w-[180px] max-sm:max-h-[180px] transform transition-transform duration-200 ease-in-out hover:scale-105 focus-visible:scale-105 cursor-pointer"/>
                </div>
                </NavLink>
                <div>
                    <NavLink to={"/sectionPitlover"} >
                    <img src={zaun} alt="" className="mx-auto block object-contain max-w-full
                    max-sm:max-w-[180px] max-sm:max-h-[180px] transform transition-transform duration-200 ease-in-out hover:scale-105 focus-visible:scale-105 cursor-pointer"/>
                    </NavLink>
                </div>
            </div>
        </>
    )
}