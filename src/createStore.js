import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import * as reducers from './reducers';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import thunk from 'redux-thunk';


export function createStore (history) {
  return reduxCreateStore(
    combineReducers({
      ...reducers,
      router: connectRouter(history)
    }),
    applyMiddleware(
      logger,
      thunk,
      routerMiddleware(history)
    )
  );
}
