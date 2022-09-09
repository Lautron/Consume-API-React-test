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
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (query.length > 3) {
      (async function () {
        let response = await throttledSearchAPI(query);
        setSearchResults(response);
      })();
    } else {
      setSearchResults([]);
    }
  }, [query]);

  const results =
    searchResults &&
    searchResults.map((result) => (
      <SearchResult
        key={`${result.name}, ${result.artists.join()}`}
        onClickHandler={props.onClickHandler}
        {...result}
      />
    ));

  return (
    props.display && (
      <div>
        <input
          style={{ width: "500px" }}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {results}
      </div>
    )
  );
};
export default SpotifySearchbar;
