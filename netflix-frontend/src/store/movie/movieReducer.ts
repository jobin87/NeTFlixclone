import { createSlice } from '@reduxjs/toolkit';

import { getmoviedata } from './movieThunk';
import { basicInitialState } from '../types';

const initialState = {
  
  movieLodded: basicInitialState,
  auth: basicInitialState,
  data:basicInitialState

 
};

export const movieReducer = createSlice({
  name: 'movie',
  initialState,
  reducers: {
   
    setMovieLodded: (state, action) => {
      state.movieLodded= action.payload;
    }
  
   
  },
  extraReducers(builder) {
    builder
      // novie data fetching
      .addCase(getmoviedata.fulfilled, (state, action) => {
        state.auth.loading = false;
        state.auth.data = action.payload;

      })
      .addCase(getmoviedata.pending, (state) => {
        state.auth.loading = true;
      })
      .addCase(getmoviedata.rejected, (state, action) => {
        state.auth.error = action.error;
        state.auth.loading = false;
      })
  },
});

export const {
 
  setMovieLodded,

} = movieReducer.actions;

export default movieReducer.reducer;
