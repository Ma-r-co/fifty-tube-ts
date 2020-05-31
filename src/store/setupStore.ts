import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import logger from 'redux-logger';
import { routerMiddleware, connectRouter, RouterRootState } from 'connected-react-router';
import thunk from 'redux-thunk';
import { History } from 'history';
import { appReducers, initialState } from './reducers';


export type RootState = ReturnType<typeof initialState> & RouterRootState;
export type ReduxStoreInstance = Store<RootState>;


export const setupStore = (history: History) => {
  return createStore(
    combineReducers({
      ...appReducers,
      router: connectRouter(history)
    }),
    applyMiddleware(
      logger,
      thunk,
      routerMiddleware(history)
    )
  );
};
