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
    <div
      className="flex items-center bg-gray-100 w-96 min-h-20 hover:bg-gray-200 cursor-pointer p-2"
      onClick={() => props.onClickHandler(props.name, props.artists[0])}
    >
      <img
        className="h-16 w-16"
        src={props.img_url}
        alt={`${props.name} album cover`}
      />
      <div className="flex flex-col h-full p-2 ml-2">
        <strong>{props.name}</strong>
        <span>{props.artists.join(", ")}</span>
      </div>
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
      <div className="flex flex-col items-center mt-10">
        <h2 className="text-2xl m-5">Find a song to translate</h2>
        <input
          placeholder="Type a song title"
          className="w-96 bg-gray-200 h-14 px-4"
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
