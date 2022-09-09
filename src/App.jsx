import React, { useState } from "react";
import useChangeDisplayState from "./hooks/useChangeDisplayState";
import SpotifySearchbar from "./components/SpotifySearchbar";
import Lyrics from "./components/Lyrics";
import { getSongData } from "./api";

function App() {
  let [songData, setSongData] = useState();
  let [shouldDisplay, changeDisplayState] = useChangeDisplayState({
    songs: false,
    lyrics: false,
    search: true,
  });

  const onSearchResultClick = async (title, author) => {
    changeDisplayState("search", "lyrics");
    let fetchedSong = await getSongData(title, author);
    setSongData(fetchedSong);
  };

  return (
    <div>
      <SpotifySearchbar
        display={shouldDisplay.search}
        onClickHandler={onSearchResultClick}
      />
      <Lyrics display={shouldDisplay.lyrics} songData={songData} />
    </div>
  );
}

export default App;
