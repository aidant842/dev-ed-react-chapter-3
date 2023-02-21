import React, { useState, useRef } from "react";
// Styles
import "./styles/app.scss";
// Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
//Util
import data from "./data";

function App() {
    //Ref
    const audioRef = useRef(null);
    //State
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    });
    const [libraryStatus, setLibraryStatus] = useState(false);
    //Event Handlers
    const timeUpdateHandler = (e) => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration;
        //Calc %
        const roundedCurrent = Math.round(currentTime);
        const roundedDuration = Math.round(duration);
        const animationPercentage = Math.round(
            (roundedCurrent / roundedDuration) * 100
        );
        setSongInfo({
            ...songInfo,
            currentTime,
            duration,
            animationPercentage,
        });
    };

    const songEndHandler = async (e) => {
        let currentIndex = songs.findIndex(
            (song) => song.id === currentSong.id
        );
        await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        if (isPlaying) audioRef.current.play();
    };
    return (
        <div className={`App ${libraryStatus ? "library-active" : ""}`}>
            <Nav
                libraryStatus={libraryStatus}
                setLibraryStatus={setLibraryStatus}
            />
            <Song currentSong={currentSong} />
            <Player
                audioRef={audioRef}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                setSongInfo={setSongInfo}
                songInfo={songInfo}
                songs={songs}
                setSongs={setSongs}
            />
            <Library
                songs={songs}
                setSongs={setSongs}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
                audioRef={audioRef}
                isPlaying={isPlaying}
                libraryStatus={libraryStatus}
            />
            <audio
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}
                onEnded={songEndHandler}
            ></audio>
        </div>
    );
}

export default App;
