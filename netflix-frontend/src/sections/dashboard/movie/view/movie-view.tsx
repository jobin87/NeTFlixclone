import { useEffect } from "react";
import { DashboardLayout } from "src/layouts/dashboard";
import { MediaSection } from "src/layouts/dashboard/struct-main";
import { useAppDispatch, useAppSelector } from "src/store";
import { getAllMovies } from "src/store/movie/movieThunk";

export const MovieView = () => {
  const dispatch = useAppDispatch();

  const movieData = useAppSelector((state) => state.movies.movies.data);
  console.log("movieData", movieData);

  const movies = movieData?.movies || [];
  const trendingmovies = movieData?.trendingmovies || [];
  const upcomingmovies = movieData?.upcomingMovies || []; // 🆕 Add this line
  const nowPlaying = movieData?.nowPlaying || []; // 🆕 Add this line


  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <MediaSection
        mediaItems={movies.map((movie: any) => ({
          id: movie.imdbID,
          title: movie.Title,
          posterUrl: movie.Poster,
          imageUrl: movie.imageURL,
          imdbRating: parseFloat(movie.imdbRating),
        }))}
        trendingItems={trendingmovies.map((movie: any) => ({
          id: movie.imdbID,
          title: movie.Title,
          posterUrl: movie.Poster,
        }))}
        nowPlaying={nowPlaying.map((movie: any) => ({
          id: movie.id.toString(),
          title: movie.title,
          posterUrl: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "", // fallback empty or some placeholder
        }))}
        upcomingItems={upcomingmovies.map((movie: any) => ({
          id: movie.id.toString(),
          title: movie.title,
          posterUrl: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "", // fallback empty or some placeholder
        }))}
        
      />
    </DashboardLayout>
  );
};
