import { createSlice } from '@reduxjs/toolkit';
import { MovieState } from '../types';
import { getAllMovies } from './movieThunk';

const initialState = {
  movies: MovieState,

  onboarding: {
    steps: {
      step: 6,
      enabled: false,
    },
  },
};

export const movieReducer = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.movies.loading = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.movies.loading = false;

        // ✅ assign both movies and trendingmovies from payload
        state.movies.data = {
          movies: action.payload.movies,
          trendingmovies: action.payload.trendingmovies,
        };
      })
      .addCase(getAllMovies.pending, (state) => {
        state.movies.loading = true;
      })
      .addCase(getAllMovies.rejected, (state, action) => {
        state.movies.error = action.error;
        state.movies.loading = false;
      });
  },
});

export const { setLoading } = movieReducer.actions;

export default movieReducer.reducer;
