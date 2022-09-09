const makeFetch = async (url) => {
  let response = await fetch(url);
  let responseJSON = await response.json();
  return responseJSON;
};

export const getSongData = (title, author) => {
  let responseJSON = makeFetch(`/lyrics/${title}/${author}/en`);
  return responseJSON;
};

export const getSongsFromPlaylist = (playlistLink) => {
  let playlistId = playlistLink.split("/")[4].split("?")[0];
  let responseJSON = makeFetch(`/songs/${playlistId}`);
  return responseJSON;
};

export const getSpotifySearchResults = (query) => {
  if (!query) {
    return;
  }
  let responseJSON = makeFetch(`/search-track/${query}`);
  return responseJSON;
};
