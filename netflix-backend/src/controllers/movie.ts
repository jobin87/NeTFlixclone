import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import axios from "axios";

// Define Movie interface
interface Movie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  Response: string;
  Images: string[];
}

// TMDB config
const TMDB_BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Yzk4Mzk5M2MzY2JjYWIyMjQ2YTY0ODFiMzFjMWNlOCIsIm5iZiI6MTc0NDIyMjMzMS42NDEsInN1YiI6IjY3ZjZiODdiZGU1ZTRkZWM2MmFjZmRjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xOtscrrk8GIvO8a7ZBlEStmLLdQJBqUZLXJPdN5y4Wc';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const getAllMovies = async (req: Request, res: Response) => {
  const filepath = path.join(__dirname, "../../contentjson/movie.json");

  try {
    // Load local movie JSON file
    const fileData = fs.readFileSync(filepath, "utf-8");
    const moviedata: Movie[] = JSON.parse(fileData);

    // Filter movies by type
    const movies = moviedata.filter(item => item.Type === "movie");
    const trendingmovies = moviedata.filter(item => item.Type === "trending-movie");

    // Fetch TMDB data
    const [upcomingRes, nowPlayingRes, topRatedRes] = await Promise.all([
      axios.get(`${TMDB_BASE_URL}/movie/upcoming`, {
        params: {
          language: "en-US",
          region: "US",
        },
        headers: {
          Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
          accept: "application/json",
        },
      }),
      axios.get(`${TMDB_BASE_URL}/movie/now_playing`, {
        params: {
          language: "en-US",
          region: "US",
        },
        headers: {
          Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
          accept: "application/json",
        },
      }),
      axios.get(`${TMDB_BASE_URL}/movie/top_rated`, {
        params: {
          language: "en-US",
          region: "US",
        },
        headers: {
          Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
          accept: "application/json",
        },
      }),
    ]);

    // Extract movie arrays from TMDB responses
    const upcomingMovies = upcomingRes.data.results;
    const nowPlaying = nowPlayingRes.data.results;
    const topRated = topRatedRes.data.results;

    // Send response
    res.json({
      movies,
      trendingmovies,
      upcomingMovies,
      nowPlaying,
      topRated,
    });
  } catch (err) {
    console.error("Error in getAllMovies:", err);
    res.status(400).json({
      message: "Error processing movie data",
      error: err instanceof Error ? err.message : err,
    });
  }
};
