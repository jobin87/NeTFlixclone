import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_METHODS, ENDPOINT_GET_MOVIES, makeNetworkCall } from 'src/network';
import { Movie } from './types';

// ✅ Define a proper response type
export interface GetAllMoviesResponse {
  movies: Movie[];
  trendingmovies: Movie[];
}

export const getAllMovies = createAsyncThunk<GetAllMoviesResponse>(
  'movie/getAllMovies',
  async () => {
    const response = await makeNetworkCall({
      method: API_METHODS.GET,
      url: ENDPOINT_GET_MOVIES,
    });

    console.log("response", response);

    return response?.data; // ✅ This must match the GetAllMoviesResponse type
  }
);
