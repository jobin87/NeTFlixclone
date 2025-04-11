import { createSlice } from '@reduxjs/toolkit';
import { AnimeState, MovieState, SeriesState } from '../types';
import { getAllMovies, getAnimes, getSeries } from './movieThunk';

const initialState = {
  movies: MovieState,
  animes:AnimeState,
  series:SeriesState,

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
          upcomingMovies: action.payload.upcomingMovies,
          nowPlaying: action.payload.nowPlaying,


        };
      })
      .addCase(getAllMovies.pending, (state) => {
        state.movies.loading = true;
      })
      .addCase(getAllMovies.rejected, (state, action) => {
        state.movies.error = action.error;
        state.movies.loading = false;
      })
      .addCase(getAnimes.fulfilled, (state, action) => {
        state.animes.loading = false;

        // ✅ assign both animes and trendingmovies from payload
        state.animes.data = {
          anime: action.payload.anime,
          trendinganimes: action.payload.trendinganime,
        };
      })
      .addCase(getAnimes.pending, (state) => {
        state.animes.loading = true;
      })
      .addCase(getAnimes.rejected, (state, action) => {
        state.animes.error = action.error;
        state.animes.loading = false;
      })
      .addCase(getSeries.fulfilled, (state, action) => {
        state.series.loading = false;

        // ✅ assign both series and trendingmovies from payload
        state.series.data = {
          series: action.payload.series,
          trendingseries: action.payload.trendingseries,
        };
      })
      .addCase(getSeries.pending, (state) => {
        state.series.loading = true;
      })
      .addCase(getSeries.rejected, (state, action) => {
        state.series.error = action.error;
        state.series.loading = false;
      });
  },
});

export const { setLoading } = movieReducer.actions;

export default movieReducer.reducer;
