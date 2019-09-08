import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import Login from './components/login/login';
import SignUp from './components/signup/signup';
import Header from './components/header/header';
import Main from './components/main/main';
import AuthorizedRoute from './authorizedRoutes';

const Routes = (store) => {
  return (
      <Router>
      <div>
        <Switch>
          {/* <Route path="/auth" component={Login} /> */}
          <Route path="/" component={Main} />
          {/* <AuthorizedRoute path="/app" component={Main} /> */}
          {/* <Redirect to="/auth" /> */}
        </Switch>
      </div>
    </Router>
  )
}

export default Routes;
