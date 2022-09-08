import React, { useState } from "react";

let Verse = (props) => {
  let [showTrans, setShowTrans] = useState(false);
  let handleClick = () => setShowTrans(!showTrans);
  if (!showTrans) {
    return (
      <div>
        <div>{props.original}</div>
        <button onClick={handleClick}>Show translation</button>
      </div>
    );
  } else {
    return (
      <div>
        {props.original}
        <hr />
        {props.trans}
        <button onClick={props.reviewDifficulty}>Bad</button>
        <button onClick={props.reviewDifficulty}>Good</button>
        <button onClick={props.reviewDifficulty}>Easy</button>
      </div>
    );
  }
};

let Lyrics = (props) => {
  let [index, setIndex] = useState(0);
  let verseArr = !props.songData
    ? ["Cargando"]
    : props.songData.map((verse, index) => {
        return (
          <Verse
            key={index}
            reviewDifficulty={() => setIndex(index + 1)}
            original={verse[0]}
            trans={verse[1]}
          />
        );
      });
  if (props.display) {
    return <div>{verseArr[index]}</div>;
  }
  return "";
};

export default Lyrics;
