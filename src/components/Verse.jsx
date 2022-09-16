import React, { useState } from "react";

const StyledButton = (props) => {
  return (
    <button
      className="bg-gray-300 rounded p-3 mx-1"
      onClick={props.clickHandler}
    >
      {props.text}
    </button>
  );
};

const StyledVerseText = (props) => (
  <div className="my-4 w-full"> {props.children} </div>
);

const ButtonsContainer = (props) => (
  <div className="flex justify-center mt-10">{props.children}</div>
);

let Verse = (props) => {
  let [showTrans, setShowTrans] = useState(false);
  let handleClick = () => setShowTrans((showTrans) => !showTrans);

  const flashcardSideA = (
    <ButtonsContainer>
      <StyledButton clickHandler={handleClick} text="Show translation" />
    </ButtonsContainer>
  );

  const flashcardSideB = (
    <>
      <hr />
      <StyledVerseText> {props.trans} </StyledVerseText>
      <ButtonsContainer>
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
      </ButtonsContainer>
    </>
  );

  return (
    <div className="min-w-96 h-1/3 justify-between mt-10 mx-5">
      <StyledVerseText> {props.original} </StyledVerseText>
      {!showTrans && flashcardSideA}
      {showTrans && flashcardSideB}
    </div>
  );
};

export default Verse;
