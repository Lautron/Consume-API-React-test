import React, {useState} from "react";

let SearchPlst = props => {
  return !props.display ? "" :
      (
      <div>
	<input style={{"width":"500px"}} id="myInput" type="text"/>
	<input onClick={() => {props.handler(document.getElementById("myInput").value)}} type="submit"/>
      </div>
    )
}
let Song = props => {
  return <button onClick={() => props.handler(props.title, props.author)} >{props.title} by <strong>{props.author}</strong></button>
}

let Songs = props => {
    if (props.display) {
      return !props.songs ? "Cargando" : 
      props.songs.map((song, index) =>{
	return <Song key={index} handler={props.handler} title={song[0]} author={song[1]}/>
    })
}
    return ""
}


let Verse = props => {
  return <li><strong>{props.original}</strong> ==> {props.trans}</li>
}
let Lyrics = props => {
  if (props.display) {
    return !props.songData ? "Cargando" : 
      props.songData.map((verse, index) =>{
      return <Verse key={index} original={verse[0]} trans={verse[1]}/> 
      })
  }
  return ""
}

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
    let result = []
    let response = await fetch(`/lyrics/${title}/${author}/en`)
    let responseJSON = await response.json()
    for (let key in responseJSON){
      result.push([key, responseJSON[key]])
    }
    setSongData(result)
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
