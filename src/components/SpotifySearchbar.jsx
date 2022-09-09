import React, { useState } from "react";

let SpotifySearchbar = (props) => {
  const [query, setQuery] = useState("");

  return (
    props.display && (
      <div>
        <input
          style={{ width: "500px" }}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input onClick={() => props.handler(query)} type="submit" />
      </div>
    )
  );
};
export default SpotifySearchbar;
