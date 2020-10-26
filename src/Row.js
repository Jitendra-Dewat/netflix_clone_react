import React, { useState, useEffect } from 'react';
import axios from './axios';
import requests from './requests';
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";



function Row({ title, fetchUrl, isLargeRow }) {
  const base_url = "https://image.tmdb.org/t/p/original";

  // this is a state......state is basically a short term memory ...and states are basically react way to declare variables
  const [movies, setMovies] = useState([]);

  const [trailerUrl, setTrailerUrl] = useState("");
  // A Snippet of code the runs based on a specific condition/ variable
  // this code will only work when the Row Component loads
  // if we leave the squre [] blank it means run ones when Row loads and dont run it again or if we right something in it like "movies" then this code will run when Row loads and will also runs every single time when valuse of "movies" varible changes
  // whenever we use anything inside of a useEffect anything or any variable that is been pulled from outside we have to have to have to include or write that variable inside the squre [] like we wrote [fetchUrl] beacause the fetchUrl will have diffrent value everytime it will be call for diffrent Row  and reason for including fetchUrl in  [] writing like [fetchUrl] this is that fetchUrl is a variable outside of useEffect Block
  useEffect(() => {
       
    async function fetchData() {
      const request = await axios.get(fetchUrl); // requesting for data from API
      setMovies(request.data.results);

      return request;
    }
    fetchData();
  }, [fetchUrl]);

  //console.table(movies);

const opts = {
  height: "390",
  width: "100%",
  playerVars: {
    autoplay: 1,
  },
};


const handleClick = (movie) => {
  if (trailerUrl) {
    // if trailerUrl, means trailor video is already opened setTrailerUrl to " "
    setTrailerUrl("");
  } else {
    movieTrailer(movie?.name || "")
      .then((url) => {
        // we wrote .then bcz movieTrailer will return a promis and this url inside .then is tertun by movieTrailer
        const urlParams = new URLSearchParams(new URL(url).search); // ( new URL(url).search ) this is for getting the youtube video id like "v=AorXolPgKlY" bcz url will give full url of youtube video
        // URLSearchParams allows us to urlParams.get('v') so URLSearchParams will give  " AorXolPgKlY " this type of id of youtube video 
        setTrailerUrl(urlParams.get("v"));
      })
      .catch((error) => console.log(error));
  }
};

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt="movie.name"
            srcset=""
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}{" "}
      {/* if we have trailerUrl the we will play trailer video */}
    </div>
  );
}
 

export default Row