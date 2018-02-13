import React from 'react';
import { Route, Switch } from 'react-router';
import {Dashboard, LoginOrRegister, About} from '../pages';
import RootContainer from '../container/RootContainer';

export default () => {
  return (
      <Switch>
        <Route path='/' component={RootContainer} />
        <Route path='login' component={LoginOrRegister} />
        <Route path='dashboard' component={Dashboard} />
        <Route path='about' component={About}/>
      </Switch>
  );
};

