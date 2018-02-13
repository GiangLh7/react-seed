import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './configureStore';
import createRoutes from './routes/mainRoute';

class AppBootstrapper {
  run() {
    this.startServices();
    this.store = configureStore({});
    this.routes = createRoutes(this.store);
    this.displayUi();
  }
  startServices() {
  
  }
  displayUi() {
    const store = this.store;
    const routes = this.routes;
    
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          {routes}
        </Router>
      </Provider>,
      document.getElementById('root'));
  }
}

// const runBootstrapped = location.pathname === '/' && location.hash.length === 0;
// if (runBootstrapped) {
//   new AppBootstrapper().run();
// }

new AppBootstrapper().run();
