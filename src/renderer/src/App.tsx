import Footer from "./components/Footer";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import SideMenu from "./components/SideMenu";
import SongInfo from "./components/SongInfo";

export default function App() {
  return (
    <>
      <div className="bg-black h-screen w-screen flex flex-col ">
        <div className="h-14 flex-shrink-0">
          <Header />
        </div>
        <div className="flex-1 flex m-2 min-h-0">
          <div className="flex-shrink-0">
            <SideMenu />
          </div>
          <div className="flex-1 flex min-h-0">
            <MainPage />
            <SongInfo />
          </div>
        </div>
        <div className="h-16 flex-shrink-0">
          <Footer />
        </div>
      </div>
    </> 
  )
}
