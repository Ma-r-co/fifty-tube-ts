import * as types from './types';

export const startRequest = (queryWord: string) => ({
  type: types.START_REQUEST,
  payload: { queryWord }
});

export const receiveData = (queryWord: string, error: boolean, response?: {}[]) => ({
  type: types.RECEIVE_DATA,
  payload: { queryWord, error, response }
});

export const finishRequest = (queryWord: string) => ({
  type: types.FINISH_REQUEST,
  payload: { queryWord }
});
