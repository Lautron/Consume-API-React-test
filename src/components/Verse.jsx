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

  const flashcardSideB = (
    <>
      <span>{props.trans}</span>
      <br />
      {props.difficulties.map((difficulty) => (
        <StyledButton
          clickHandler={() => props.handleDifficulty(difficulty)}
          text={difficulty}
          key={difficulty}
        />
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

export default Verse;
