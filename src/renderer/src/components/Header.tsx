import React from "react";
import { IoAlbumsOutline, IoChevronBackSharp, IoChevronForwardSharp, IoEllipsisHorizontal, IoSearchOutline } from "react-icons/io5";
import { GrHomeRounded } from "react-icons/gr";
import { FaMinus, FaRegBell, FaRegSquareFull, FaXmark } from "react-icons/fa6";
import { IoPeopleOutline } from "react-icons/io5";
import { useState } from "react";
import pfp from '../assets/pfp.jpg';
export default function Header() {
    const [active, setActive] = useState<"home" | "album" | "bell" | "people">("home");

    return (
        <div className="flex flex-row w-full justify-between items-center h-14 relative pr-1">
            <div className="flex gap-2 flex-1">
                <button className="p-4">
                    <IoEllipsisHorizontal className="text-2xl"/>
                </button>
                <div className="flex flex-row gap-2">
                    <button >
                        <IoChevronBackSharp className="text-2xl brightness-25 hover:scale-110 hover:brightness-110 active:scale-100 active:brightness-75 transition-all duration-200"/>
                    </button>
                    <button >
                        <IoChevronForwardSharp className="text-2xl brightness-25 hover:scale-110 hover:brightness-110 active:scale-100 active:brightness-75 transition-all duration-200"/>
                    </button>
                </div>
            </div>
            <div className="flex flex-row items-center justify-center flex-1">
                <button onClick={() => setActive("home")} className="rounded-full w-12 h-12 mr-4 bg-customgray hover:scale-110 hover:brightness-110 active:scale-100 active:brightness-75 transition-all duration-200 outline-none">
                    <GrHomeRounded className={`text-2xl m-auto ${active === "home" ? "fill-white" : ""}`}/>
                </button>
                <div className="flex flex-row bg-customgray p-3 rounded-[23px] w-120 justify-between hover:brightness-150 focus-within:outline-2 transition-all duration-600 ">
                    <div className="flex">
                        <IoSearchOutline className="text-2xl"/>
                        <input type="text" placeholder="What do you want to play?" className="pl-4 w-[380px] border-none outline-none"/>
                    </div>
                    <div className="flex">
                        <div className="w-px h-6 bg-neutral-500 mx-3"/>
                        <button onClick={() => setActive("album")} className="hover:scale-110 hover:brightness-110 active:scale-100 active:brightness-75 transition-all duration-200">
                            <IoAlbumsOutline className={`text-2xl ${active === "album" ? "fill-white" : ""}`} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-7 items-center flex-1 justify-end">
                <div className="flex flex-row gap-8 pr-3 items-center">
                    <button onClick={() => setActive("bell")}  className="hover:scale-110 hover:brightness-110 active:scale-100 active:brightness-75 transition-all duration-200">
                        <FaRegBell className={`text-xl fill-white ${active === "bell" ? "fill-white" : ""}`}/>
                    </button>
                    <button onClick={() => setActive("people")} className="hover:scale-110 hover:brightness-120 active:scale-100 active:brightness-75 transition-all duration-200">
                        <IoPeopleOutline className={`text-xl ${active === "people" ? "fill-white" : ""}`}/>
                    </button>
                    <button className="rounded-full w-12 h-12 pt-[1px] bg-customgray hover:scale-110 hover:brightness-110 active:scale-100 active:brightness-75 transition-all duration-200 outline-none">
                        <img src={pfp} alt="" className="object-cover rounded-full scale-65" />
                    </button>
                </div>
                <div className=" flex flex-row" >
                    <button className="hover:bg-customgray/70 w-10 h-8 m-auto ">
                        <FaMinus className="m-auto"/>
                    </button>
                    <button className="hover:bg-customgray/70  w-10 h-8 ">
                        <FaRegSquareFull className="m-auto"/>
                    </button>
                    <button className="hover:bg-amber-700/50 w-10 h-8 ">
                        <FaXmark className="text-xl m-auto"/> 
                    </button>
                </div>
            </div>
        </div>
    )
}