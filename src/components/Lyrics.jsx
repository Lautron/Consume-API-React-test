import React, { useState, useMemo } from "react";
import FlatQueue from "flatqueue";

const CONFIG = {
  priorityChange: {
    Again: -5,
    Hard: -1,
    Good: 0,
    Easy: 5,
  },
  defaultDifficulty: 0,
};

CONFIG.difficulties = Object.keys(CONFIG.priorityChange);

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
      {CONFIG.difficulties.map((difficulty) => (
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

class PqueueWrapper {
  constructor(array) {
    this.pqueue = new FlatQueue();
    array.forEach((_, index) =>
      this.pqueue.push(index, CONFIG.defaultDifficulty)
    );
  }

  pop() {
    return this.pqueue.pop();
  }

  peek() {
    return this.pqueue.peek();
  }

  peekPriority() {
    return this.pqueue.peekValue();
  }

  push(item, priority) {
    this.pqueue.push(item, priority);
  }
}

const usePriorityQueue = (array) => {
  const pqueue = useMemo(() => new PqueueWrapper(array), [array]);
  let [current, setCurrent] = useState(0);

  const pushBackAndSetNew = (priority) => {
    const newIndex = pqueue.pop();
    pqueue.push(newIndex, priority);
    setCurrent(newIndex);
    console.log(`newIndex: ${newIndex}`);
  };

  const dispatch = (difficulty) => {
    const oldPriority = pqueue.peekPriority();
    const newPriority = oldPriority + CONFIG.priorityChange[difficulty];
    console.log(
      `oldPriority: ${oldPriority}, newPriority: ${newPriority}, difficulty: ${difficulty}`
    );
    if (newPriority > 10) {
      pqueue.pop();
    }
    pushBackAndSetNew(newPriority);
  };

  return [current, dispatch];
};

let Lyrics = (props) => {
  let [index, dispatchDifficulty] = usePriorityQueue(props.songData);
  if (props.songData) {
    props.songData[index] && console.log(index, props.songData[index][0]);
  }
  let verseArr = !props.songData
    ? ["Cargando"]
    : props.songData.map((verse, index) => {
        return (
          <Verse
            key={index}
            handleDifficulty={dispatchDifficulty}
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
