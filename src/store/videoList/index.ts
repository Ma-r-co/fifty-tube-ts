import { Actions } from '../actions';
import { VideoListState, RECEIVE_DATA, START_REQUEST } from './types';

export const initialState = (injects?: VideoListState): VideoListState => ({
  queryWord: undefined,
  videos: undefined,
  error: false
});

export const reducer = (state=initialState(), action: Actions) => {
  switch (action.type) {
    case START_REQUEST:
      return {
        queryWord: action.payload.queryWord,
        videos: undefined,
        error: false
      };
    case RECEIVE_DATA:
      return action.payload.error
        ? {...state, error: true }
        : {...state, videos:action.payload.response}
    default:
      return state
  }
}