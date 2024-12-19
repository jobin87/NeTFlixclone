// src/views/MovieView.tsx
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import { getmoviedata } from 'src/store/movie/movieThunk';
import { Movie } from 'src/sections/content/movie';
import { Series } from 'src/sections/content/series';

export const MovieView = () => {
  const { movies, series } = useAppSelector((state) => state.movie.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getmoviedata()); // Fetch the movie data when the component mounts
  }, [dispatch]);

  return (
    <Box>
      <Movie movies={movies} />
      <Series series={series} />
    </Box>
  );
};
