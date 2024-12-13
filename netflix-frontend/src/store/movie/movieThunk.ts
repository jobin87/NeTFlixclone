
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_METHODS,
  
} from 'src/network';
import type {
    MovieParams,
} from './types';
import { makeNetworkCall } from 'src/network/networkcall';
import { ENDPOINT_MOVIES} from 'src/network/endpoints';

// Sign in action
export const getmoviedata = createAsyncThunk(
  'app/signInWithPassword',
  async (params: MovieParams) => {
    const response = await makeNetworkCall({
      method: API_METHODS.GET,
      url: ENDPOINT_MOVIES,
      data: params,
    });

    const { userLogged } = response?.data?.data;

    if (userLogged) {
      return response?.data?.data;
    }

    throw new Error('Something went wrong!');
  }
);



