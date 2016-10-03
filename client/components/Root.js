import React from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

import routes from './routes';

const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
);

export default () => {
  return (
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
  );
}
