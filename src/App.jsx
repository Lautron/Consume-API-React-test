import React, { useState } from "react";
import useChangeDisplayState from "./hooks/useChangeDisplayState";
import SearchPlst from "./components/SearchPlst";
import Songs from "./components/Songs";
import Lyrics from "./components/Lyrics";

function App() {
  let [songs, setSongs] = useState();
  let [songData, setSongData] = useState();
  let [shouldDisplay, changeDisplayState] = useChangeDisplayState({
    songs: false,
    lyrics: false,
    search: true,
  });
  let getSongData = async (title, author) => {
    changeDisplayState("songs", "lyrics");
    let response = await fetch(`/lyrics/${title}/${author}/en`);
    let responseJSON = await response.json();
    setSongData(responseJSON);
  };
  let getSongs = async (playlistLink) => {
    let playlistId = playlistLink.split("/")[4].split("?")[0];
    let response = await fetch(`/songs/${playlistId}`);
    let responseJSON = await response.json();
    setSongs(responseJSON);
    changeDisplayState("songs", "search");
  };
  return (
    <div>
      <SearchPlst display={shouldDisplay.search} handler={getSongs} />
      <Songs
        handler={getSongData}
        display={shouldDisplay.songs}
        songs={songs}
      />
      <Lyrics display={shouldDisplay.lyrics} songData={songData} />
    </div>
  );
}

export default App;
