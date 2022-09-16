import React, { useState } from "react";
import useChangeDisplayState from "./hooks/useChangeDisplayState";
import SpotifySearchbar from "./components/SpotifySearchbar";
import Lyrics from "./components/Lyrics";

function App() {
  let [songDetails, setSongDetails] = useState({});
  let [shouldDisplay, changeDisplayState] = useChangeDisplayState({
    songs: false,
    lyrics: false,
    search: true,
  });

  const onSearchResultClick = async (title, author) => {
    changeDisplayState("search", "lyrics");
    setSongDetails({ title: title, author: author });
  };

  return (
    <div>
      <SpotifySearchbar
        display={shouldDisplay.search}
        onClickHandler={onSearchResultClick}
      />
      <Lyrics display={shouldDisplay.lyrics} songDetails={songDetails} />
    </div>
  );
}

export default App;
