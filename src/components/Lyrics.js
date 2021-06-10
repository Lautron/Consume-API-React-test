import React from "react"

let Verse = props => {
  return <li><strong>{props.original}</strong> ==> {props.trans}</li>
}

let mapSongData = (verse, index) => {
  return <Verse key={index} original={verse[0]} trans={verse[1]}/> 
}

let Lyrics = props => {
  if (props.display) {
    return !props.songData ? "Cargando" : props.songData.map(mapSongData)
  }
  return ""
}

export default Lyrics
