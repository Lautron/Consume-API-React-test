import React, { useState } from "react";
import useChangeDisplayState from "./hooks/useChangeDisplayState";
import SpotifySearchbar from "./components/SpotifySearchbar";
import Lyrics from "./components/Lyrics";
import { getSongData } from "./api";
import MinStablePqueue from "./helpers/StablePriorityQueue";

const DEFAULT_PRIORITY = 0;

function createPqueueArray(array) {
  return array.map((elem, index) =>
    MinStablePqueue.createPqueueItem(elem, DEFAULT_PRIORITY, index)
  );
}

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
      <Lyrics display={shouldDisplay.lyrics} songData={songData} />
    </div>
  );
}

export default App;
