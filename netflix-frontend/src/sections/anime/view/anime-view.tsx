// src/views/MovieView.tsx
import { Box} from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import { getmoviedata } from 'src/store/movie/movieThunk';
import { Anime } from '../Anime';

export const AnimeView = () => {
  const {anime} = useAppSelector((state) => state.movie.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getmoviedata()); // Fetch the movie data when the component mounts
  }, [dispatch]);

  return (
    <Box>
      <Anime anime={anime} />
    </Box>
  );
};
