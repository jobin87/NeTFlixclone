import { useEffect } from "react";
import { DashboardLayout } from "src/layouts/dashboard";
import { MediaSection } from "src/layouts/dashboard/struct-main";
import { useAppDispatch, useAppSelector } from "src/store";
import {  getAnimes } from "src/store/movie/movieThunk";

export const AnimeView = () => {
  const dispatch = useAppDispatch();

  // ✅ Correctly extract both movies and trendingmovies
  const movieData = useAppSelector((state) => state.movies.animes.data);
  console.log("movieData", movieData.anime);

  const movies = movieData?.anime || [];
  const trendingmovies = movieData?.trendinganimes || [];

  useEffect(() => {
    dispatch(getAnimes());
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
