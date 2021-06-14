import React, {useState} from "react"

let Verse = props => {
  let [showTrans, setShowTrans] = useState(false);
  let handleClick = () => setShowTrans(!showTrans)
  return (
    !showTrans ? 
    <div onClick={handleClick}>
      {props.original}
    </div> :
    <div onClick={handleClick}>
      {props.original}
      <br/>
      {"-".repeat(50)}
      <br/>
      {props.trans}
    </div>
  )
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
