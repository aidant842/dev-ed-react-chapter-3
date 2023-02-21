import React from "react";

const LibrarySong = ({
    song,
    setCurrentSong,
    audioRef,
    isPlaying,
    id,
    songs,
    setSongs,
}) => {
    //Event Handlers
    const songSelectHandler = async () => {
        await setCurrentSong(song);
        //Add active state
        const newSongs = songs.map((song) => {
            if (song.id === id) {
                return {
                    ...song,
                    active: true,
                };
            } else {
                return {
                    ...song,
                    active: false,
                };
            }
        });
        setSongs(newSongs);
        // check if song is playing
        if (isPlaying) audioRef.current.play();
    };
    return (
        <div
            onClick={songSelectHandler}
            className={`library-song ${song.active ? "selected" : ""}`}
        >
            <img src={song.cover} alt="of {currentSong.name}"></img>
            <div className="song-description">
                <h4>{song.name}</h4>
                <h3> {song.artist}</h3>
            </div>
        </div>
    );
};

export default LibrarySong;
