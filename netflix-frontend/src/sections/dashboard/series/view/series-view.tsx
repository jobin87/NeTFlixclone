import { useEffect } from "react";
import { DashboardLayout } from "src/layouts/dashboard";
import { MediaSection } from "src/layouts/dashboard/struct-main";
import { useAppDispatch, useAppSelector } from "src/store";
import {   getSeries } from "src/store/movie/movieThunk";

export const SeriesView = () => {
  const dispatch = useAppDispatch();

  // ✅ Correctly extract both movies and trendingmovies
  const movieData = useAppSelector((state) => state.movies.series.data);
  console.log("movieData", movieData.series);

  const movies = movieData?.series || [];
  const trendingmovies = movieData?.trendingseries || [];

  useEffect(() => {
    dispatch(getSeries());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <MediaSection
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
