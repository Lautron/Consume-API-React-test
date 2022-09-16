import React, { useState, useRef, useEffect } from "react";
import Verse from "./Verse";
import { getSongData } from "../api.js";
import MinStablePqueue from "../helpers/StablePriorityQueue";

const DEFAULT_PRIORITY = 0;

const CONFIG = {
  priorityChange: {
    Again: -5,
    Hard: -1,
    Good: 1,
    Easy: 5,
  },
};

CONFIG.difficulties = Object.keys(CONFIG.priorityChange);

function createPqueueArray(array) {
  return array.map((elem, index) =>
    MinStablePqueue.createPqueueItem(elem, DEFAULT_PRIORITY, index)
  );
}

const usePriorityQueue = (songDetails) => {
  const songLyrics = useRef(null);
  const [currentVerse, setCurrentVerse] = useState([]);
  useEffect(() => {
    (async function () {
      let lyrics = await getSongData(songDetails);
      if (lyrics) {
        songLyrics.current = new MinStablePqueue(createPqueueArray(lyrics));
        setCurrentVerse(songLyrics.current.peek().value);
      }
    })();
  }, [songDetails]);

  const pushBackAndSetNew = (priority) => {
    const newIndex = songLyrics.current.pop().value;
    songLyrics.current.push(newIndex, priority);
    console.log(`newIndex: ${newIndex}`);
    setCurrentVerse(newIndex);
  };

  const dispatchDifficulty = (difficulty) => {
    if (songLyrics.current.size < 1) {
      return;
    }
    const oldPriority = songLyrics.current.peekPriority();
    const newPriority = oldPriority + CONFIG.priorityChange[difficulty];
    console.log(
      `oldPriority: ${oldPriority}, newPriority: ${newPriority}, difficulty: ${difficulty}`
    );
    if (newPriority > 10) {
      songLyrics.current.pop();
    }
    pushBackAndSetNew(newPriority);
    console.table(
      songLyrics.current.toArray().map((item) => {
        return { ...item, value: item.value[0] };
      })
    );
  };

  return [currentVerse, dispatchDifficulty];
};

let Lyrics = (props) => {
  const [currentSong, dispatchDifficulty] = usePriorityQueue(props.songDetails);
  if (props.display && currentSong) {
    let verse = (
      <Verse
        handleDifficulty={dispatchDifficulty}
        original={currentSong[0]}
        trans={currentSong[1]}
        difficulties={CONFIG.difficulties}
      />
    );
    return (
      <div className="flex flex-col items-center w-full text-xl">
        {currentSong[0] ? verse : "Loading..."}
      </div>
    );
  }
  return "";
};

export default Lyrics;
