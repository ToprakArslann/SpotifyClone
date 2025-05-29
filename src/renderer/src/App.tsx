import Footer from "./components/Footer";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import SideMenu from "./components/SideMenu";
import SongInfo from "./components/SongInfo";

export default function App() {
  return (
    <>
      <div className="bg-black h-screen w-screen">
        <Header />
        <SideMenu />
        <MainPage />
        <SongInfo />
        <Footer />
      </div>
    </> 
  )
}
