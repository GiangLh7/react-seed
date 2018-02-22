import React from 'react';
import { Route, Switch } from 'react-router';
import {Dashboard, LoginOrRegister, About} from '../pages';

export default () => {
  return (
      <Switch>
        <Route path='login' component={LoginOrRegister} />
        <Route path='dashboard' component={Dashboard} />
        <Route path='about' component={About}/>
      </Switch>
  );
};

