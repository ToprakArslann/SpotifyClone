import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import SideMenu from "./components/SideMenu";
import SongInfo from "./components/SongInfo";
import LoginPage from "./components/LoginPage";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

const getTokenFromUrl = () => {
  return window.location.hash.substring(1).split("&").reduce((initial, item) => {
    let parts = item.split("=");
    initial[parts[0]] = decodeURIComponent(parts[1]);
    return initial;
  }, {});
};

export default function App() {
  const [spotifyToken, setSpotifyToken] = useState("");
  const [nowPlaying, setNowPlaying] = useState({});
  const [userPlaylists, setUserPlaylists] = useState({});
  const [followedArtists, setFollowedArtists] = useState({});
  const [userShows, setUserShows] = useState({});
  const [likedTracks, setLikedTracks] = useState({});
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [trackDuration, setTrackDuration] = useState(0);
  const [trackPosition, setTrackPosition] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log("token from url", getTokenFromUrl());
    const spotifyToken = getTokenFromUrl().access_token;
    window.location.hash = "";
    console.log("spotify token", spotifyToken)

    if (spotifyToken) {
      setSpotifyToken(spotifyToken);
      setLoggedIn(true);
      spotifyApi.setAccessToken(spotifyToken);
    }
  }, [])

  const getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      console.log(response);
      setNowPlaying({
        name: response.item?.name,
        albumArt: response.item?.album.images[0].url,
        artists: response.item?.artists,
        volumePercent: response.device.volume_percent,
        isPlaying: response.is_playing
      });
      setTrackDuration(response.item?.duration_ms ? Math.floor(response.item.duration_ms / 1000) : 0);
      setTrackPosition(response.progress_ms ? Math.floor(response.progress_ms / 1000) : 0);
    })
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (loggedIn) {
      interval = setInterval(() => {
        spotifyApi.getMyCurrentPlaybackState().then((response) => {
            setCurrentTrackId(response?.item?.id);
            setNowPlaying({
              name: response.item?.name,
              albumArt: response.item?.album.images[0].url,
              artists: response.item?.artists,
              volumePercent: response.device.volume_percent,
              isPlaying: response.is_playing
            });
            if (response?.item?.id !== currentTrackId) {
              setCurrentTrackId(response?.item?.id);
            }
        });
      }, 2000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loggedIn, currentTrackId, spotifyToken]);

  useEffect(() => {
    if (loggedIn) {
      spotifyApi.getFollowedArtists().then((data) => {
        setFollowedArtists(data.artists.items);
      })
      spotifyApi.getUserPlaylists().then((data) => {
        console.log(data);
        setUserPlaylists(data.items);
      })
      spotifyApi.getMySavedShows().then((data) => {
        setUserShows(data.items.map(item => item.show));
        console.log(userShows);
      })
      spotifyApi.getMySavedTracks().then((data) => {
        setLikedTracks(data.items);
      })
    }
  }, [loggedIn]);

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      if (response.is_playing) {
        spotifyApi.pause().then(() => {
          setTimeout(getNowPlaying, 100);
        });
      } else {
        spotifyApi.play().then(() => {
          setTimeout(getNowPlaying, 100);
        });
      }
    })
  }
  const handleSkipNext = () => {
    spotifyApi.skipToNext().then(() => {
      setTimeout(getNowPlaying, 500); // 0.5 saniye sonra güncelle
    });
  };

  const handleSkipPrevious = () => {
    spotifyApi.skipToPrevious().then(() => {
      setTimeout(getNowPlaying, 500);
    });
  };
  const handleRepeat = () => {
    spotifyApi.setRepeat("track");
  }

  const handleVolume = (volume) => {
    spotifyApi.setVolume(volume).then(() => {
      setTimeout(getNowPlaying, 100);
    });
  }

  const handleSeek = (position) => {
    spotifyApi.seek(position * 1000).then(() => {
      getNowPlaying();
    });
  };

  useEffect(() => {
    let interval;
    if (loggedIn) {
        interval = setInterval(() => {
            spotifyApi.getMyCurrentPlaybackState().then((response) => {
                setTrackPosition(response.progress_ms ? Math.floor(response.progress_ms / 1000) : 0);
            });
        }, 1000);
    }
    return () => clearInterval(interval);
  }, [loggedIn, spotifyToken]);

  useEffect(() => {
    setInterval(() => {
      getNowPlaying();
    }, 100);
  }, [])

  return (
    <>
      {!loggedIn &&
        <div className="flex w-screen h-screen rounded-md">
          <LoginPage />
        </div>
      }
      {loggedIn &&
        <div className="bg-black h-screen w-screen flex flex-col rounded-md">
          <div className="h-14 flex-shrink-0">
            <Header />
          </div>
          <div className="flex flex-1 flex-row justify-between m-2 gap-2 min-h-0">
            <SideMenu userPlaylists={userPlaylists} followedArtists={followedArtists} userShows={userShows} likedTracks={likedTracks}/>
            <div className="flex items-center justify-center w-full rounded-md overflow-hidden">
              <MainPage />
            </div>
            <div className="flex items-center justify-center w-[40%] min-w-70 max-w-90 rounded-md bg-amber-300 overflow-hidden">
              <SongInfo />
            </div>
          </div>
          <div className="h-[78px] flex-shrink-0 ">
            <Footer nowPlaying={nowPlaying} getNowPlaying={getNowPlaying} onPlayPause={handlePlayPause} onSkipNext={handleSkipNext} onSkipPrevious={handleSkipPrevious} onRepeat={handleRepeat} handleVolume={handleVolume} trackDuration={trackDuration} trackPosition={trackPosition} setTrackPosition={setTrackPosition} handleSeek={handleSeek}/>
          </div>
        </div>
      }

    </>
  )
}
