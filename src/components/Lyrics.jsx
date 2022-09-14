import React, { useState } from "react";

const StyledButton = (props) => {
  return (
    <button className="bg-gray-300 rounded p-3" onClick={props.clickHandler}>
      {props.text}
    </button>
  );
};

let Verse = (props) => {
  let [showTrans, setShowTrans] = useState(false);
  let handleClick = () => setShowTrans((showTrans) => !showTrans);

  const flashcardSideA = (
    <StyledButton clickHandler={handleClick} text="Show translation" />
  );

  const difficulties = ["Hard", "Good", "Easy"];
  const flashcardSideB = (
    <>
      <span>{props.trans}</span>
      <br />
      {difficulties.map((difficulty) => (
        <StyledButton clickHandler={props.reviewDifficulty} text={difficulty} />
      ))}
    </>
  );

  return (
    <div className="min-w-96 h-1/3 justify-between">
      <span> {props.original} </span>
      <hr />
      {!showTrans && flashcardSideA}
      {showTrans && flashcardSideB}
    </div>
  );
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
    return (
      <div className="flex flex-col items-center w-full text-xl">
        {verseArr[index]}
      </div>
    );
  }
  return "";
};

export default Lyrics;
