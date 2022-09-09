import React from "react";

let SpotifySearchbar = (props) => {
  return !props.display ? (
    ""
  ) : (
    <div>
      <input style={{ width: "500px" }} id="myInput" type="text" />
      <input
        onClick={() => {
          props.handler(document.getElementById("myInput").value);
        }}
        type="submit"
      />
    </div>
  );
};
export default SpotifySearchbar;
