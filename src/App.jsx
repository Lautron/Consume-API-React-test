import React, { useState } from "react";
import useChangeDisplayState from "./hooks/useChangeDisplayState";
import SpotifySearchbar from "./components/SpotifySearchbar";
import Songs from "./components/Songs";
import Lyrics from "./components/Lyrics";
import { getSongData, getSongs } from "./api";

function App() {
  let [songs, setSongs] = useState();
  let [songData, setSongData] = useState();
  let [shouldDisplay, changeDisplayState] = useChangeDisplayState({
    songs: false,
    lyrics: false,
    search: true,
  });

  let songsHandler = async (title, author) => {
    changeDisplayState("songs", "lyrics");
    let fetchedSong = await getSongData(title, author);
    setSongData(fetchedSong);
  };
  let searchHandler = async (playlistLink) => {
    if (!playlistLink) {
      return;
    }
    let fetchedPlaylistSongs = await getSongs(playlistLink);
    setSongs(fetchedPlaylistSongs);
    changeDisplayState("songs", "search");
  };

  return (
    <div>
      <SpotifySearchbar
        display={shouldDisplay.search}
        handler={searchHandler}
      />
      <Songs
        handler={songsHandler}
        display={shouldDisplay.songs}
        songs={songs}
      />
      <Lyrics display={shouldDisplay.lyrics} songData={songData} />
    </div>
  );
}

export default App;
