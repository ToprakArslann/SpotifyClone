import React, { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import SideMenu from "./components/SideMenu";
import SongInfo from "./components/SongInfo";
import LoginPage from "./components/LoginPage";


export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      {!loggedIn &&
        <div className="w-screen h-screen flex ">
          <LoginPage/>
        </div>
      }
      {loggedIn && 
        <div className="bg-black h-screen w-screen flex flex-col ">
          <div className="h-14 flex-shrink-0">
            <Header />
          </div>
          <div className="flex-1 flex m-2 gap-2 min-h-0">
            <div className="flex-shrink-0 bg-amber-200">
              <SideMenu />
            </div>
            <div className="flex-1 flex min-h-0 bg-amber-300">
              <MainPage />
            </div>
            <div className="flex-1 flex min-h-0 bg-amber-700">
              <SongInfo />
            </div>
          </div>
          <div className="h-[78px] flex-shrink-0 ">
            <Footer />
          </div>
        </div>
      }
      
    </> 
  )
}
