import React, { useState, useEffect } from "react";
import { getSpotifySearchResults } from "../api";
import throttle from "lodash/throttle";

const throttledSearchAPI = throttle(
  async (query) => {
    return await getSpotifySearchResults(query);
  },
  3000,
  { leading: true }
);

const SearchResult = (props) => {
  return (
    <div onClick={() => props.onClickHandler(props.name, props.artists[0])}>
      <img src={props.img_url} alt={`${props.name} album cover`} />
      <strong>{props.name}</strong> by {props.artists.join(", ")}
    </div>
  );
};

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
