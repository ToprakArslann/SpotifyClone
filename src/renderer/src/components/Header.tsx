import React from "react";
import { IoAlbumsOutline, IoChevronBackSharp, IoChevronForwardSharp, IoEllipsisHorizontal, IoSearchOutline } from "react-icons/io5";
import { GrHomeRounded } from "react-icons/gr";
import { FaMinus, FaRegBell, FaRegSquareFull, FaXmark } from "react-icons/fa6";
import { IoPeopleOutline } from "react-icons/io5";
import { useState } from "react";
import pfp from '../assets/pfp.jpg';
export default function Header() {
    const [active, setActive] = useState<"home" | "album" | "bell" | "people">("home");

    const handleMinimize = async () => {
        try {
            await window.api.windowControls.minimize();
        } catch (error) {
            console.error('Failed to minimize window:', error);
        }
    };

    const handleMaximize = async () => {
        try {
            await window.api.windowControls.maximize();
        } catch (error) {
            console.error('Failed to maximize window:', error);
        }
    };

    const handleClose = async () => {
        try {
            await window.api.windowControls.close();
        } catch (error) {
            console.error('Failed to close window:', error);
        }
    };
    
    return (
        <>
            <div className="flex flex-row w-full justify-between items-center h-14 relative pr-1 pt-1 drag-region">
                <div className="flex gap-2 flex-shrink-0 no-drag">
                    <button className="p-4">
                        <IoEllipsisHorizontal className="text-2xl"/>
                    </button>
                    <div className="flex flex-row gap-2">
                        <button >
                            <IoChevronBackSharp className="text-2xl brightness-25 customButton"/>
                        </button>
                        <button >
                            <IoChevronForwardSharp className="text-2xl brightness-25 customButton"/>
                        </button>
                    </div>
                </div>
                <div className="flex flex-row items-center flex-1 mx-4 min-w-0 min-[1200px]:ml-40 min-[1200px]:justify-center max-[1199px]:justify-start">
                    <button onClick={() => setActive("home")} className="flex-shrink-0 rounded-full w-12 h-12 mr-2 bg-customgray customButton outline-none">
                        <GrHomeRounded className={`text-2xl m-auto ${active === "home" ? "fill-white" : ""} brightness-75`}/>
                    </button>
                    <div className="flex flex-row bg-customgray p-3 rounded-[23px] justify-between hover:brightness-150 focus-within:outline-2 transition-all duration-600 w-full max-w-[480px] no-drag">
                        <div className="flex items-center flex-1 min-w-0">
                            <IoSearchOutline className="text-2xl flex-shrink-0 brightness-75"/>
                            <input type="text" placeholder="What do you want to play?" className="pl-4 w-full border-none outline-none bg-transparent"/>
                        </div>
                        <div className="flex items-center">
                            <div className="w-px h-6 bg-neutral-500 mx-3"/>
                            <button onClick={() => setActive("album")} className="customButton">
                                <IoAlbumsOutline className={`text-2xl ${active === "album" ? "fill-white" : ""} brightness-75`} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-2 flex-shrink-0">
                    <div className="flex flex-row gap-5 pr-3 items-center max-[810px]:hidden">
                        <button onClick={() => setActive("bell")}  className="customButton  ">
                            <FaRegBell className={`text-xl fill-white ${active === "bell" ? "fill-white" : ""} brightness-75`}/>
                        </button>
                        <button onClick={() => setActive("people")} className="hover:scale-110 hover:brightness-120 active:scale-100 active:brightness-75 transition-all duration-200 ">
                            <IoPeopleOutline className={`text-xl ${active === "people" ? "fill-white" : ""} brightness-75`}/>
                        </button>
                    </div>
                    <button className="rounded-full w-12 h-12 pt-[1px] bg-customgray customButton outline-none mr-2">
                        <img src={pfp} alt="" className="object-cover rounded-full scale-68" />
                    </button>
                    <div className=" flex flex-row" >
                        <button onClick={handleMinimize} className="hover:bg-customgray/70 w-10 h-8 flex items-center justify-center">
                            <FaMinus className=" brightness-75"/>
                        </button>
                        <button onClick={handleMaximize} className="hover:bg-customgray/70  w-10 h-8  flex items-center justify-center">
                            <FaRegSquareFull className=" brightness-75"/>
                        </button>
                        <button onClick={handleClose} className="hover:bg-amber-700/50 w-10 h-8  flex items-center justify-center">
                            <FaXmark className="text-xl brightness-75"/> 
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}