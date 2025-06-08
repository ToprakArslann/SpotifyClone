import { ChevronLeft, ChevronRight, VolumeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react"
import { CgPlayButton } from "react-icons/cg";
import SimpleBar from "simplebar-react";

function ScrollableContainer({ children, title, subtitle, showAllLink }: {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    showAllLink?: boolean;
}) {
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const checkScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -320,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 320,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        checkScrollButtons();
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', checkScrollButtons);
            return () => scrollContainer.removeEventListener('scroll', checkScrollButtons);
        }
    }, []);

    return (
        <div className="flex flex-col w-full mb-8">
            <div className="flex w-full items-end justify-between mb-4">
                <span className="flex-col">
                    <p className="font-thin text-xs text-gray-300">
                        {subtitle}
                    </p>
                    <a href="#" className="hover:underline font-bold text-xl">
                        {title}
                    </a>
                </span>
                {showAllLink && (
                    <a href="#" className="hover:underline font-bold text-gray-400 mr-10 text-sm">
                        Show All
                    </a>
                )}
            </div>
            
            <div className="relative group">
                <button 
                    className={`absolute left-5 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center transition-opacity duration-200 ${
                        canScrollLeft ? 'opacity-0 group-hover:opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                    onClick={scrollLeft}
                >
                    <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                
                <button 
                    className={`absolute right-5 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center transition-opacity duration-200 ${
                        canScrollRight ? 'opacity-0 group-hover:opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                    onClick={scrollRight}
                >
                    <ChevronRight className="w-5 h-5 text-white" />
                </button>
                
                <div 
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto overflow-y-hidden gap-4 pb-2 scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

function PlaylistItem({ index }: { index: number }) {
    return (
        <div className="flex flex-col w-45 h-60 p-3 gap-3 hover:bg-white/10 rounded-md items-start flex-shrink-0 transition-all duration-200 cursor-pointer group/item">
            <div className="relative w-full aspect-square bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-md overflow-hidden shadow-lg">
                <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                        {index + 1}
                    </span>
                </div>
                
                <div className="absolute bottom-2 right-2 opacity-0 group-hover/item:opacity-100 transform translate-y-2 group-hover/item:translate-y-0 transition-all duration-200 z-10">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                        <CgPlayButton className="text-6xl text-black"/>
                    </div>
                </div>
            </div>
            
            <div className="w-full">
                <h3 className="font-semibold text-white text-sm mb-1 truncate">
                    Playlist Name {index + 1}
                </h3>
                <p className="text-gray-400 text-xs truncate">
                    Artist Name, Another Artist, Another Artist
                </p>
            </div>
        </div>
    );
}
function ArtistItem({ index }: { index: number }) {
    return (
        <div className="flex flex-col w-45 h-60 p-3 gap-3 hover:bg-white/10 rounded-md items-start flex-shrink-0 transition-all duration-200 cursor-pointer group/item">
            <div className="relative w-full aspect-square rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 shadow-lg">
                <div className="w-full h-full flex items-center justify-center overflow-hidden">
                    <span className="text-white font-bold text-lg">
                        {index + 1}
                    </span>
                </div>
                
                <div className="absolute bottom-2 right-2 opacity-0 group-hover/item:opacity-100 transform translate-y-2 group-hover/item:translate-y-0 transition-all duration-200">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                        <CgPlayButton className="text-6xl text-black"/>
                    </div>
                </div>
            </div>
            
            <div className="w-full">
                <h3 className="font-semibold text-white text-sm mb-1 truncate">
                    Artist Name {index + 1}
                </h3>
            </div>
        </div>
    );
}

export default function MainPage() {
    const [randomColor, setRandomColor] = useState("");
    const [active, setActive] = useState<"all" | "music" | "podcasts">("all");

    useEffect(() => {
        const colors = [
            "to-green-700",
            "to-orange-700",
            "to-gray-700",
            "to-purple-700"
        ]
        setRandomColor(colors[Math.floor(Math.random() * 4)])
    },[])

    return (
        <div className={`@container flex flex-col w-full h-full items-center bg-gradient-to-t from-customgray ${randomColor} from-65% bg-fixed`}>
            <header className="w-full h-15 z-10 sticky top-0 flex flex-row items-center justify-start pt-5 pb-5 pl-10 gap-2 transition-all duration-300 max-w-500">
                <button className={`flex items-center justify-center pt-1 pb-1 pr-2 pl-2 rounded-full ${active === "all" ? "bg-white text-black" :  "bg-white/10 hover:bg-white/20 active:bg-white/50"}`} onClick={() => {setActive("all")}}>All</button>
                <button className={`flex items-center justify-center pt-1 pb-1 pr-2 pl-2 rounded-full ${active === "music" ? "bg-white text-black" :  "bg-white/10 hover:bg-white/20 active:bg-white/50"}`} onClick={() => {setActive("music")}}>Music</button>
                <button className={`flex items-center justify-center pt-1 pb-1 pr-2 pl-2 rounded-full ${active === "podcasts" ? "bg-white text-black" :  "bg-white/10 hover:bg-white/20 active:bg-white/50"}`} onClick={() => {setActive("podcasts")}}>Podcasts</button>
            </header>
            <SimpleBar className="flex-1 w-full h-full pl-10 overflow-y-auto overflow-x-hidden max-w-500">
                <div className="w-full mb-8 pr-10">
                    <div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-4 gap-2">
                        {[...Array(8)].map((_,i) => (
                            <div key={i} className="flex h-14 @7xl:h-16 @min-[120rem]:h-20 items-center bg-white/10 hover:bg-white/20 rounded-md overflow-hidden cursor-pointer transition-all duration-200 ">
                                <div className="w-14 h-14 @7xl:w-16 @7xl:h-16 @min-[120rem]:w-20 @min-[120rem]:h-20 bg-gray-600 flex-shrink-0 overflow-hidden drop-shadow-[10px_0px_8px_rgba(0,0,0,0.25)]">
                                    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                        <span className="text-white text-xs @7xl:text-sm @min-[120rem]:text-base font-bold">
                                            demo
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="flex-1 px-4 @7xl:px-5 @min-[120rem]:px-6 min-w-0">
                                    <p className="text-white font-semibold text-sm @7xl:text-base @min-[120rem]:text-lg truncate">
                                        demotext1123123
                                    </p>
                                </div>
                                
                                <div className="mr-4 @7xl:mr-5 @min-[120rem]:mr-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <div className="w-8 h-8 @7xl:w-10 @7xl:h-10 @min-[120rem]:w-12 @min-[120rem]:h-12 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                                        <CgPlayButton className="text-3xl @7xl:text-5xl @min-[120rem]:text-7xl text-black"/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <ScrollableContainer title="Toprak" subtitle="Made For" showAllLink>
                    {[...Array(7)].map((_, i) => (
                        <PlaylistItem key={i} index={i} />
                    ))}
                </ScrollableContainer>
                
                <ScrollableContainer title="Recently Played" subtitle="Your">
                    {[...Array(6)].map((_, i) => (
                        <PlaylistItem key={i} index={i} />
                    ))}
                    {[...Array(3)].map((_, i) => (
                        <ArtistItem key={i} index={i} />
                    ))}
                </ScrollableContainer>
                
                <ScrollableContainer title="Popular Albums" subtitle="Trending" showAllLink>
                    {[...Array(3)].map((_, i) => (
                        <PlaylistItem key={i} index={i} />
                    ))}
                </ScrollableContainer>
                <ScrollableContainer title="Party" subtitle="" showAllLink>
                    {[...Array(15)].map((_, i) => (
                        <PlaylistItem key={i} index={i} />
                    ))}
                </ScrollableContainer>
                <ScrollableContainer title="Your Top Mixes" subtitle="" showAllLink>
                    {[...Array(15)].map((_, i) => (
                        <PlaylistItem key={i} index={i} />
                    ))}
                </ScrollableContainer>
                <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 @min-[100rem]:grid-cols-4 gap-4 pr-10 pb-10">
                {[...Array(8)].map((_, i) => (
                    <div 
                    key={i}
                    className="group relative w-full max-w-md aspect-[4/5] brightness-90 hover:brightness-100 hover:bg-white/20 rounded-lg transition-all duration-200 overflow-hidden mx-auto"
                    >
                        <div className="relative w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg group overflow-hidden">
                            <div className="absolute top-10 left-0 right-0 h-14 flex items-center p-4 z-10">
                                <div className="flex w-25 h-25 items-center justify-center flex-shrink-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-md shadow-lg">
                                    {i + 1}
                                </div>
                                <div className="flex flex-col ml-3 overflow-hidden">
                                    <p className="text-white text-lg font-bold truncate">Playlist Name</p>
                                    <p className="text-gray-300 text-xs truncate">Playlist Spotify</p>
                                </div>
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-white/10 text-9xl font-bold">{i+1}</span>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-white/80 text-sm font-semibold line-clamp-2 mb-3 transform translate-y-0 group-hover:-translate-y-4 transition-all duration-300">
                                Another Artist, Another Artist, Another Artist, And more
                                </h3>
                                
                                <div className="flex justify-between items-center relative h-12">
                                    <button 
                                        className="flex items-center gap-2 bg-black/60 hover:bg-black/70 hover:scale-105 rounded-full px-4 py-2 transition-all duration-300 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex items-center gap-2 animate-pulse">
                                            <VolumeOff/>
                                            Preview
                                        </div>
                                    </button>
                                    
                                    <button 
                                        className="bg-white rounded-full shadow-lg hover:scale-105 transition-all duration-300 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <CgPlayButton className="text-6xl text-black" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </SimpleBar>
        </div>
    )
}