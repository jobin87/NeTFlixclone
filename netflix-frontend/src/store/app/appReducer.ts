import { createSlice } from '@reduxjs/toolkit';

import { basicInitialState, MovieState, networkCallInitialState } from '../types';
import { requestSignInWithPassword } from './appThunk';


const initialState = {
  auth: basicInitialState,
  accessToken: null,
  userLogged: false,
  forgetpassword: networkCallInitialState,
  resetpassword: networkCallInitialState,
  userDocuments: [],
  movies: {...MovieState},

  // ---------------------------------------
  onboarding: {
    steps: {
      step: 6,
      enabled: false,
    },
  },
};

export const appReducer = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.auth.data = action.payload
    },
    setLogged: (state, action) => {
      state.userLogged = action.payload;
    },
    setAuthToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUserDetails: (state, action) => {
      state.auth.data = action.payload;
    },
    setUserLoggedOut: (state) => {
      state.auth = basicInitialState;
      state.accessToken = null;
      state.userLogged = false;
    },
    setForgetPassword: (state, action) => {
      state.forgetpassword = action.payload;
    },
    setResetPassword: (state, action) => {
      state.resetpassword = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      // Sign In
      .addCase(requestSignInWithPassword.fulfilled, (state, action) => {
        state.auth.data = action.payload;
        state.auth.loading = false;

      })
      .addCase(requestSignInWithPassword.pending, (state) => {
        state.auth.loading = true;
      })
      .addCase(requestSignInWithPassword.rejected, (state, action) => {
        state.auth.error = action.error;
        state.auth.loading = false;
      })
  },
});

export const {
  setLoading,
  setLogged,
  setAuthToken,
  setUserDetails,
  setForgetPassword,
  setResetPassword,
  setUserLoggedOut,
} = appReducer.actions;

export default appReducer.reducer;
