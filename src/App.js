import React, {useState, useEffect} from "react";
import './App.css';

function App() {
  let [songs, setSongs] = useState()
  let fetchApi = async () => {
    let response = await fetch("/songs/2lQmoFIprIw1xjHDa5xesY")
    console.log(response.status)
    let responseJSON = await response.json()
    console.log(responseJSON)
    setSongs(responseJSON)
  }
  useEffect(() => {
    fetchApi()
  }
  ,[])
  return (
    <div>
    {!songs ? "Cargando" : 
      songs.map((song, index) =>{
	return <li key={index}>{song[0]} by <strong>{song[1]}</strong></li>
      })
    }
    </div>
  );
}

export default App;
