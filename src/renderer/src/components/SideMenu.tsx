import { LuLibrary } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import { RiMusic2Line } from "react-icons/ri";
import "simplebar-react/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";
export default function SideMenu() {
    return (
        <div className="flex flex-col h-full min-w-[72px] max-w-[72px] relative rounded-md bg-customgray2 pt-4 pr-1 pl-1">
            <div className="flex flex-col flex-shrink-0 items-center pb-2 pt-2">
                <button className="customButton">
                    <LuLibrary className="text-2xl"/>
                </button>
                <button className="rounded-full bg-customgray mt-4 mb-4 hover:brightness-150 transition-all duration-200 p-[6px]">
                    <GoPlus className="text-2xl brightness-75"/>
                </button>
            </div>
            <SimpleBar className="flex-1 min-h-0 h-full overflow-y-auto overflow-x-hidden">
                    <div className="flex flex-col items-center gap-2 pt-1 pr-1 pl-1 pb-2">
                        {[...Array(15)].map((_, index) => (
                            <div className="w-[65px] h-[65px] hover:bg-customgray rounded-md flex justify-center items-center flex-shrink-0">
                                <button className="bg-customgray3 w-[50px] h-[50px] flex justify-center items-center rounded-md">
                                    <RiMusic2Line className="text-3xl"/>
                                </button>
                            </div>
                        ))}
                    </div>
            </SimpleBar>
        </div>
    )
}