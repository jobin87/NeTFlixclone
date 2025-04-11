import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_METHODS,
  ENDPOINT_GET_ANIME,
  ENDPOINT_GET_MOVIES,
  ENDPOINT_GET_SERIES,
  makeNetworkCall,
} from 'src/network';
import { Movie, UpcomingMovie } from './types'; // Ensure Movie includes anime-appropriate fields

// Define API response types
export interface GetAllMoviesResponse {
  movies: Movie[];
  trendingmovies: Movie[];
  upcomingMovies: UpcomingMovie[];
  nowPlaying: UpcomingMovie[];
  anime:Movie[];
  trendinganime:Movie[];

  
}

export interface GetAllAnimeResponse {
  anime: Movie[];
  trendinganime: Movie[];
}

export interface GetAllSeriesResponse {
  series: Movie[];
  trendingseries: Movie[];
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

export const getSeries = createAsyncThunk<GetAllSeriesResponse>(
  'movie/getSeries',
  async () => {
    const response = await makeNetworkCall({
      method: API_METHODS.GET,
      url: ENDPOINT_GET_SERIES,
    });

    console.log('series Response:', response);

    return response?.data;
  }
);
