import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { AppContainer } from 'react-hot-loader';

render(<AppContainer component={App} />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render (
      <AppContainer
        component={require('./components/App').default}
      />,
      document.getElementById('app')
    );
  });
}
