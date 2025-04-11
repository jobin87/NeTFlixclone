import { useEffect } from "react";
import { DashboardLayout } from "src/layouts/dashboard";
import { MediaSection } from "src/layouts/dashboard/struct-main";
import { useAppDispatch, useAppSelector } from "src/store";
import { getAllMovies } from "src/store/movie/movieThunk";

export const TrendingView = () => {
  const dispatch = useAppDispatch();

  const movieData = useAppSelector((state) => state.movies.movies.data);
  console.log("movieData", movieData);

  const trendingmovies = movieData?.trendingmovies || [];
  console.log("trendinggg:",trendingmovies)
  const upcomingmovies = movieData?.upcomingMovies || []; // 🆕 Add this line


  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  return (
    <DashboardLayout>
    <MediaSection
        mediaItems={trendingmovies.map((movie: any) => ({
          id: movie.imdbID,
          title: movie.Title,
          posterUrl: movie.Poster,
          imageUrl: movie.imageURL,
          imdbRating: parseFloat(movie.imdbRating),
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
