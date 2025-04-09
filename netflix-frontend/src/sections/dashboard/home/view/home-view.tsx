import { useEffect } from "react";
import { DashboardLayout } from "src/layouts/dashboard";
import { MediaSection } from "src/layouts/dashboard/struct-main";
import { useAppDispatch, useAppSelector } from "src/store";
import { getAllMovies } from "src/store/movie/movieThunk";

export const HomeView = () => {
  const dispatch = useAppDispatch();

  // ✅ Correctly extract both movies and trendingmovies
  const movieData = useAppSelector((state) => state.movies.movies.data);
  console.log("movieData", movieData);

  const movies = movieData?.movies || [];
  const trendingmovies = movieData?.trendingmovies || [];

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <MediaSection
        label="New This Week"
        mediaItems={movies.map((movie: any) => ({
          id: movie.imdbID,
          title: movie.Title,
          posterUrl: movie.Poster,
          imageUrl:movie.imageURL,
          imdbRating: parseFloat(movie.imdbRating),
        }))}
        trendingItems={trendingmovies.map((movie: any) => ({
          id: movie.imdbID,
          title: movie.Title,
          posterUrl: movie.Poster,
        }))}
      />
    </DashboardLayout>
  );
};
