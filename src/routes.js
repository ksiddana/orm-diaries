import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Login from './components/login/login';
import SignUp from './components/signup/signup';
import Header from './components/header/header';

const Routes = () => {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Create a New Account</Link></li>
        </ul>
        <Route exact path='/' component={Header} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
      </div>
    </Router>
  );
};

export default Routes;
