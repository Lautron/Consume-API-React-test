import React, {useState} from "react";
import SearchPlst from "./components/SearchPlst.js"
import Songs from "./components/Songs.js"
import Lyrics from "./components/Lyrics.js"

function App() {
  let [songs, setSongs] = useState()
  let [shouldDisplay, setShouldDisplay] = useState(
    {
    "songs": false,
    "lyrics": false,
    "search": true
    }
  )
  let changeDisplayState = (...components) => {
    let shouldDisplayCopy = {...shouldDisplay}
    components.map(
      (component, index) => {shouldDisplayCopy[component] = !shouldDisplayCopy[component]; return ""}
    )
    setShouldDisplay(shouldDisplayCopy)
  }
  let [songData, setSongData] = useState()
  let getSongData = async (title, author) => {
    changeDisplayState("songs", "lyrics") 
    let response = await fetch(`/lyrics/${title}/${author}/en`)
    let responseJSON = await response.json()
    setSongData(responseJSON)
  }
  let getSongs = async (playlistLink) => {
    let playlistId = playlistLink.split("/")[4].split("?")[0]
    let response = await fetch(`/songs/${playlistId}`)
    let responseJSON = await response.json()
    setSongs(responseJSON)
    changeDisplayState("songs", "search") 
  }
  return (
    <div>
      <SearchPlst display={shouldDisplay.search} handler={getSongs}/>
      <Songs handler={getSongData} display={shouldDisplay.songs} songs={songs}/>
      <Lyrics display={shouldDisplay.lyrics} songData={songData}/>
    </div>
  );
};

export default App;
