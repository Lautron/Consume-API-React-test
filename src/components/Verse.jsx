import React, { useState } from "react";

const StyledButton = (props) => {
  return (
    <button className="bg-gray-300 rounded p-3" onClick={props.clickHandler}>
      {props.text}
    </button>
  );
};

const StyledVerseText = (props) => (
  <div className="my-4 w-full"> {props.children} </div>
);

let Verse = (props) => {
  let [showTrans, setShowTrans] = useState(false);
  let handleClick = () => setShowTrans((showTrans) => !showTrans);

  const flashcardSideA = (
    <StyledButton clickHandler={handleClick} text="Show translation" />
  );

  const flashcardSideB = (
    <>
      <StyledVerseText> {props.trans} </StyledVerseText>
      {props.difficulties.map((difficulty) => (
        <StyledButton
          clickHandler={() => {
            props.handleDifficulty(difficulty);
            handleClick();
          }}
          text={difficulty}
          key={difficulty}
        />
      ))}
    </>
  );

  return (
    <div className="min-w-96 h-1/3 justify-between mt-10">
      <StyledVerseText> {props.original} </StyledVerseText>
      <hr />
      {!showTrans && flashcardSideA}
      {showTrans && flashcardSideB}
    </div>
  );
};

export default Verse;
