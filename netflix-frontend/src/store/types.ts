import {  Movie, UpcomingMovie } from "./movie/types";

// Loading is true by default. Use case: When needed to call an api on page load.
export const basicInitialState: basicInitialStateProps = {
  data: null,
  loading: false,
  error: {},
};
export const MovieState: MovieStateProps = {
  data: {
    movies: [],
    trendingmovies: [],
    upcomingMovies:[],
    nowPlaying:[],

  },
  loading: false,
  error: null,
};

export const AnimeState: AnimeStateProps = {
  data: {
    anime: [],
    trendinganimes: [],
  },
  loading: false,
  error: null,
};

export const SeriesState: SeriesStateProps = {
  data: {
    series: [],
    trendingseries: [],
  
  },
  loading: false,
  error: null,
};


// Loading is false by default. Use case: When needed to call an api on button click.
export const networkCallInitialState: basicInitialStateProps = {
  data: null,
  loading: false,
  error: {},
};

export interface basicInitialStateProps {
  data: null | object | any;
  loading: boolean;
  error: null | object;
}

export interface MovieStateProps {
  data: MovieResponse;
  loading: boolean;
  error: null | object;
}

export interface AnimeStateProps {
  data: MovieRespons;
  loading: boolean;
  error: null | object;
}

export interface SeriesStateProps {
  data: MovieRespon;
  loading: boolean;
  error: null | object;
}


export interface MovieResponse {
  movies: Movie[];
  trendingmovies: Movie[];
  upcomingMovies: UpcomingMovie[];
  nowPlaying: UpcomingMovie[];

}

export interface MovieRespons {
  anime: Movie[];
  trendinganimes: Movie[];
}


export interface MovieRespon {
  series: Movie[];
  trendingseries: Movie[];
}






