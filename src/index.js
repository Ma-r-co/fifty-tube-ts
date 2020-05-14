import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App.js';
import { createStore } from './createStore';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';


const history = createBrowserHistory();
const store = createStore(history);


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
