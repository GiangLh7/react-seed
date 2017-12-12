import React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import RootContainer from './container/RootContainer';
import configureStore from './configureStore';

class AppBootstrapper {
  run() {
    this.startServices();
    this.store = configureStore({});
    this.displayUi();
  }
  startServices() {
  
  }
  displayUi() {
    const store = this.store;
    ReactDOM.render(
      <Provider store={store}>
        <div>Hello React!!!</div>
      </Provider>,
      document.getElementById('root'));
  }
}

const runBootstrapped = location.pathname === '/' && location.hash.length === 0;
if (runBootstrapped) {
  new AppBootstrapper().run();
}
