import * as videoList from './videoList';

export const initialState = () => {
  return {
    videoList: videoList.initialState(),
  };
};

export const appReducers = {
  videoList: videoList.reducer,
};
