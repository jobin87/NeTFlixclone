import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_METHODS,
  ENDPOINT_GET_ANIME,
  ENDPOINT_GET_MOVIES,
  makeNetworkCall,
} from 'src/network';
import { Movie } from './types'; // Ensure Movie includes anime-appropriate fields

// Define API response types
export interface GetAllMoviesResponse {
  movies: Movie[];
  trendingmovies: Movie[];
}

export interface GetAllAnimeResponse {
  anime: Movie[];
  trendinganime: Movie[];
}

// Fetch all movies
export const getAllMovies = createAsyncThunk<GetAllMoviesResponse>(
  'movie/getAllMovies',
  async () => {
    const response = await makeNetworkCall({
      method: API_METHODS.GET,
      url: ENDPOINT_GET_MOVIES,
    });

    console.log('🎬 Movies Response:', response);

    return response?.data;
  }
);

// Fetch all animes
export const getAnimes = createAsyncThunk<GetAllAnimeResponse>(
  'movie/getAnimes',
  async () => {
    const response = await makeNetworkCall({
      method: API_METHODS.GET,
      url: ENDPOINT_GET_ANIME,
    });

    console.log('Animes Response:', response);

    return response?.data;
  }
);
