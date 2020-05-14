import {START_REQUEST, RECEIVE_DATA} from '../actions/types';


const initialState = {
  queryWord: undefined,
  videos: undefined,
  error: false
};

export default (state=initialState, action) => {
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
        : {...state, ...action.payload}
    default:
      return state
  }
}