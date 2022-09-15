import React, { useState } from "react";
import Verse from "./Verse";
import getSongData from "../api.js";

const CONFIG = {
  priorityChange: {
    Again: -5,
    Hard: -1,
    Good: 0,
    Easy: 5,
  },
};

CONFIG.difficulties = Object.keys(CONFIG.priorityChange);

const usePriorityQueue = (pqueue) => {
  let [current, setCurrent] = useState([]);

  const pushBackAndSetNew = (priority) => {
    const newIndex = pqueue.pop().value;
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
  let [currentSong, dispatchDifficulty] = usePriorityQueue(props.songData);
  let fetchedSong;
  getSongData(props.songDetails).then((data) => (fetchedSong = data));

  let verse = (
    <Verse
      key={currentSong}
      handleDifficulty={dispatchDifficulty}
      original={currentSong[0]}
      trans={currentSong[1]}
      difficulties={CONFIG.difficulties}
    />
  );

  if (props.display) {
    return (
      <div className="flex flex-col items-center w-full text-xl">
        {props.songData && verse}
      </div>
    );
  }
  return "";
};

export default Lyrics;
