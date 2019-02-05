import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Cnn from './components/cnn/cnn';
import Header from './components/header/header';

const Routes = () => {
  return (
    <Router>
      <div>
        <Header />
      </div>
    </Router>
  );
};

export default Routes;
