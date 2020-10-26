import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

// snippet trick rfce
function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    /* useEffect runs based on a condition */
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return requests;
    }
    fetchData();
  }, []);

  console.log("randomly selected movie is", movie);
  

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div>
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(
          "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`, // this ? is beacause if the movie.backdrop_path doesn't find anything the it shoudn't freakout
          backgroundPosition: "center center",
        }}
      >
        <div className="banner_contents">
          <h1 className="banner_title">
            {movie?.title || movie?.name || movie?.original_name}{" "}
            {/*this ? is
            beacause if the movie.title doesn't find anything the it shoudn't freakout*/}
          </h1>
          <div className="banner_buttons">
            <button className="banner_button">Play</button>
            <button className="banner_button">My List</button>
          </div>

          <h1 className="banner_description">
            {truncate(movie?.overview, 150)}
          </h1>
        </div>
        <div className="banner_fadeBottom" />
      </header>
    </div>
  );
}

export default Banner;
