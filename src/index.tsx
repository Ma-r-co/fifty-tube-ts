import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { setupStore } from './store/setupStore';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';


const history = createBrowserHistory();
const store = setupStore(history);


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
