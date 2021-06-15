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
  let [index, setIndex] = useState(0)
  let verseArr = !props.songData ? ["Cargando"] : props.songData.map(mapSongData)
  if (props.display) {
    return (
      <div>
	{verseArr[index]}
	<button onClick={() => setIndex(index - 1)}>{"<--"}</button>
	<button onClick={() => setIndex(index + 1)}>{"-->"}</button>
      </div>
    )
  }
  return ""
}

export default Lyrics
