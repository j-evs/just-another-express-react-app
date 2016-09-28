import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import { AppContainer } from 'react-hot-loader';

render(<AppContainer><Root /></AppContainer>, document.getElementById('app'));

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const Root = require('./components/Root');
    render (
      <AppContainer>
        <Root />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
