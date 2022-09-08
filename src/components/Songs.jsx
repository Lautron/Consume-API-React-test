import React from "react";

let Song = (props) => {
  return (
    <button onClick={() => props.handler(props.title, props.author)}>
      {props.title} by <strong>{props.author}</strong>
    </button>
  );
};

let Songs = (props) => {
  if (props.display) {
    return !props.songs
      ? "Cargando"
      : props.songs.map((song, index) => {
          return (
            <Song
              key={index}
              handler={props.handler}
              title={song[0]}
              author={song[1]}
            />
          );
        });
  }
  return "";
};

export default Songs;
