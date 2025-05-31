import { MinusCircle, PlusCircle, Volume, Volume1, Volume2, VolumeOff } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import { IoIosPause, IoIosPlay, IoIosShuffle, IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";
import { TbMicrophone2 } from "react-icons/tb";
import { MdFullscreen, MdOutlineSmartDisplay } from "react-icons/md";
import { HiOutlineQueueList } from "react-icons/hi2";
import { PiDesktopTowerFill } from "react-icons/pi";
import { SlLoop } from "react-icons/sl";
import { CgMiniPlayer } from "react-icons/cg";
import songCover from "../assets/songCover.png";
import { format } from "path";

export default function Footer() {
    const [play, setPlay] = useState(false);
    const [currentTime, setCurrentTime] = useState(17);
    const [duration,setDuration] = useState(333);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [replay, setReplay] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [volume,setVolume] = useState(100);
    const [tempVolume, setTempVolume] = useState(100);
    const [volumeHover, setVolumeHover] = useState(false);
    const [mini,setMini] = useState(false);
    const [active, setActive] = useState<"song" | "queue" | "connect">("song");
    const [lyrics, setLyrics] = useState(false);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };


    const handleTimeChange = (e) => {
        const newTime = parseInt(e.target.value);
        setCurrentTime(newTime);
    };

    const handleRangeMouseDown = () => {
        setIsDragging(true);
    };

    const handleRangeMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if(currentTime === duration && !replay){
            setPlay(true);
        } else if (currentTime === duration && replay) {
            setCurrentTime(0);
            setPlay(false);

        }
        
    },[play,currentTime,duration,replay])
    useEffect(() => {
        let interval;
        if (!play && !isDragging && currentTime < duration) {
            interval = setInterval(() => {
                setCurrentTime(prev => {
                    if (prev >= duration) {
                        setPlay(false);
                        return duration;
                    }
                    return prev + 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [play, currentTime, duration, isDragging]);

    
    const VolumeLevel = () => {
        if (volume === 0) {
            return <VolumeOff className="size-4.5"/>
        } else if (volume < 50) {
            return <Volume className="size-4.5"/>
        } else if (volume < 75) {
            return <Volume1 className="size-4.5"/>
        } else {
            return <Volume2 className="size-4.5"/>
        }
    }

    return (
        <div className="items-center justify-between flex relative w-full h-[78px]">
            <div className="flex flex-row items-center justify-start flex-1 ml-2 w-[30%] min-w-[240px] h-full">
                <div className="bg-customgray w-14 h-14 ml-2 rounded-md items-center justify-center overflow-hidden flex-shrink-0">
                    <img src={songCover} alt="" className="w-full h-full object-cover"/>
                </div>
                <div className="flex flex-row overflow-hidden whitespace-nowrap pl-4">
                    <div className="flex flex-col w-full justify-start">
                        <a href="#" className="hover:underline font-medium">Iron - Gucci Vump Remix</a>
                        <p className="font-light brightness-75 text-xs">
                            <a href="#" className="hover:underline">Woodkid</a>,
                            <a href="#" className="hover:underline">Gucci Vump</a>
                        </p>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-3 scale-80  h-full ml-2">
                    <MinusCircle className="customButton"/>
                    <PlusCircle className="customButton"/>
                </div>
            </div>
            <div className="flex items-center justify-center p-2 h-full w-[40%]">
                <div className="flex flex-col items-center justify-center flex-1 min-w-0">
                    <div className="flex flex-row items-center justify-center gap-4 mb-1">
                        <button className="flex customButton justify-center items-center" onClick={() => setShuffle(!shuffle)}>
                            <IoIosShuffle className={`text-3xl ${shuffle ? "text-green-700" : ""}`}/>
                            {shuffle && 
                                <div className="absolute bg-green-700 w-1 h-1 mt-7 rounded-full">
                                </div>
                            }
                        </button>
                        <button className="customButton" onClick={() => {setCurrentTime(0); setPlay(false);}}>
                            <IoIosSkipBackward className="text-2xl"/>
                        </button>
                        <button className="text-black bg-white  rounded-full p-1.5 flex-shrink-0 customButton" onClick={() => {
                            if(currentTime === duration){
                                setCurrentTime(0);
                            }
                            setPlay(!play)
                        }}>
                            {play ? (
                                    <IoIosPlay className="text-2xl"/>
                                ) : (
                                    <IoIosPause className="text-2xl"/>
                                )
                            }
                        </button>
                        <button className="customButton" onClick={() => {setCurrentTime(duration); setPlay(true); setReplay(false);}}>
                            <IoIosSkipForward className="text-2xl"/>
                        </button>
                        <button className="flex customButton justify-center items-center" onClick={() => setReplay(!replay)}>
                            <SlLoop className={`text-xl rounded-md ${replay ? "text-green-700" : ""}`}/>
                            {replay && 
                                <div className="absolute bg-green-700 w-1 h-1 mt-7 rounded-full">
                                </div>
                            }
                        </button>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-2 w-full">
                        <span className="text-xs w-7 text-right">
                            {formatTime(currentTime)}
                        </span>
                        
                        <div className="flex flex-1 max-w-[600px] h-1 mt-0.5 items-center rounded-full bg-customgray3 brightness-250 relative">
                            <input
                                type="range"
                                min="0"
                                max={duration}
                                value={currentTime}
                                onChange={handleTimeChange}
                                onMouseDown={handleRangeMouseDown}
                                onMouseUp={handleRangeMouseUp}
                                onTouchStart={handleRangeMouseDown}
                                onTouchEnd={handleRangeMouseUp}
                                className="slider w-full h-[4px] bg-transparent cursor-pointer appearance-none rounded-full
                                    [&::-webkit-slider-track]:rounded-full [&::-webkit-slider-track]:h-[5px]
                                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:opacity-0 hover:[&::-webkit-slider-thumb]:opacity-100 [&::-webkit-slider-thumb]:transition-opacity
                                    [&::-moz-range-track]:rounded-full [&::-moz-range-track]:h-[5px] [&::-moz-range-track]:border-none
                                    [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:opacity-0 hover:[&::-moz-range-thumb]:opacity-100"
                                style={{
                                    background: `linear-gradient(to right, ${isHovered ? '#22c55e' : 'white'} 0%, ${isHovered ? '#22c55e' : 'white'} ${(currentTime / duration) * 100}%, transparent ${(currentTime / duration) * 100}%, transparent 100%)`
                                }}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            />
                        </div>
                        
                        <span className="text-xs w-5 text-left">
                            -{formatTime(duration - currentTime)}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-2 h-full flex-1 justify-end  items-center min-w-[250px] w-[30%] mr-2">
                <div className="flex flex-row ml-1 mr-1 gap-3 h-full items-center">
                    <button className="flex justify-center items-center customButton" onClick={() => setActive("song")}>
                        <MdOutlineSmartDisplay className={`text-xl ${active === "song" ? "text-green-700" : ""}`}/>
                        {active === "song" ? 
                            <div className="absolute bg-green-700 w-1 h-1 mt-7 rounded-full">
                            </div>
                            : null
                        } 
                    </button>
                    <button className="flex justify-center items-center customButton" onClick={() => setLyrics(!lyrics)}>
                        <TbMicrophone2 className={`text-xl ${lyrics ? "text-green-700" : ""}`}/>
                        {lyrics && 
                            <div className="absolute bg-green-700 w-1 h-1 mt-7 rounded-full">
                            </div>
                        }
                    </button>
                    <button className="flex justify-center items-center customButton" onClick={() => setActive("queue")}>
                        <HiOutlineQueueList className={`text-xl ${active === "queue" ? "text-green-700" : ""}`}/>
                        {active === "queue" ? 
                            <div className="absolute bg-green-700 w-1 h-1 mt-7 rounded-full">
                            </div>
                            : null
                        }
                    </button>
                    <button className="flex justify-center items-center customButton" onClick={() => setActive("connect")}>
                        <PiDesktopTowerFill className={`text-xl ${active === "connect" ? "text-green-700" : ""}`}/>
                        {active === "connect" ? 
                            <div className="absolute bg-green-700 w-1 h-1 mt-7 rounded-full">
                            </div>
                            : null
                        }
                    </button>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <button className="flex customButton" onClick={() =>{
                        if(volume !== 0) {
                            setTempVolume(volume);
                            setVolume(0);
                        } else {
                            setVolume(tempVolume);
                        }

                    }}>
                        <VolumeLevel/>
                    </button>
                    <div className="flex flex-1 items-center h-1 rounded-full relative bg-customgray3 brightness-250">
                        <input type="range"
                        value={volume}
                        max={100}
                        min={0}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="slider w-full max-w-[90px] h-[4px] bg-transparent cursor-pointer appearance-none rounded-full
                            [&::-webkit-slider-track]:rounded-full [&::-webkit-slider-track]:h-[5px]
                            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:opacity-0 hover:[&::-webkit-slider-thumb]:opacity-100 [&::-webkit-slider-thumb]:transition-opacity
                            [&::-moz-range-track]:rounded-full [&::-moz-range-track]:h-[5px] [&::-moz-range-track]:border-none
                            [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:opacity-0 hover:[&::-moz-range-thumb]:opacity-100"
                        onMouseEnter={() => setVolumeHover(true)}
                        onMouseLeave={() => setVolumeHover(false)}
                        style={{
                            background: `linear-gradient(to right, ${volumeHover ? '#22c55e' : 'white'} 0%, ${volumeHover ? '#22c55e' : 'white'} ${volume}%, transparent ${volume}%, transparent 100%)`
                        }}
                        />
                    </div>
                </div>
                <div className="flex flex-row items-center gap-2 mr-1 ml-1">
                    <button className="flex customButton justify-center items-center" onClick={() => setMini(!mini)}>
                        <CgMiniPlayer className={`text-xl ${mini ? "text-green-700" : ""}`}/>
                        {mini && 
                            <div className="absolute bg-green-700 w-1 h-1 mt-7 rounded-full">
                            </div>
                        }
                    </button>
                    <button className="customButton">
                        <MdFullscreen className="text-2xl"/>
                    </button>

                </div>
            </div>
        </div>
    )
}