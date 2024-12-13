import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_METHODS,
  
} from 'src/network';
import type {
  SignInParams,
} from './types';
import { makeNetworkCall } from 'src/network/networkcall';
import { ENDPOINT_USER_LOGIN } from 'src/network/endpoints';
import { persistor } from '..';
import { paths } from 'src/routes/paths';

// Sign in action
export const requestSignInWithPassword = createAsyncThunk(
  'app/signInWithPassword',
  async (params: SignInParams) => {
    const response = await makeNetworkCall({
      method: API_METHODS.POST,
      url: ENDPOINT_USER_LOGIN,
      data: params,
    });

    const { userLogged } = response?.data?.data;

    if (userLogged) {
      return response?.data?.data;
    }

    throw new Error('Something went wrong!');
  }
);
export const requestSignOut = createAsyncThunk(
    'app/signOut',
    async (onClose: (() => void) | undefined = () => {}, { dispatch }) => {
      await persistor.purge();
      onClose();
      window.location.href = paths.auth.signIn;
    }
  );


