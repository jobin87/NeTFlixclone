import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MediaSubSection } from "src/layouts/dashboard/struct-sub";
import { useAppDispatch, useAppSelector } from "src/store";
import { getAllMovies } from "src/store/movie/movieThunk";

export const MovieSubView = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const selectedMovie = location.state;

  const movieData = useAppSelector((state) => state.movies.movies.data);
  const movies = movieData?.movies || [];
  const trendingmovies = movieData?.trendingmovies || [];

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  // Match selected movie with full version from store to ensure plot/imageUrl is present
  const fullSelectedMovie = selectedMovie
    ? movies.find((m) => m.imdbID === selectedMovie.imdbID) || selectedMovie
    : undefined;

  const mediaItems = fullSelectedMovie
    ? [fullSelectedMovie, ...movies.filter((m) => m.imdbID !== fullSelectedMovie.imdbID)]
    : movies;

  // Debug logs
  console.log("Selected Movie (raw):", selectedMovie);
  console.log("Full Selected Movie (with plot):", fullSelectedMovie);
  console.log(
    "Mapped Media Items:",
    mediaItems.map((movie: any) => ({
      id: movie.imdbID,
      title: movie.Title,
      plot: movie.Plot,
      imageUrl: movie.imageURL,
      imdbRating: movie.imdbRating,
    }))
  );

  return (
    <MediaSubSection
      label="New This Week"
      mediaItems={mediaItems.map((movie: any) => ({
        id: movie.imdbID,
        title: movie.Title,
        posterUrl: movie.Poster,
        imageUrl: movie.imageURL || movie.Poster,
        plot: movie.Plot,
        imdbRating: parseFloat(movie.imdbRating),
      }))}
      trendingItems={trendingmovies.map((movie: any) => ({
        id: movie.imdbID,
        title: movie.Title,
        posterUrl: movie.Poster,
      }))}
    />
  );
};
