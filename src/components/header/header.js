import React, { Component } from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import './header.css';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loggedIn } = this.props;
    return (
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Create a New Account</Link></li>
      </ul>
    );
  }
};

export default connect(state => ({
  loggedIn: state.user.loggedIn,
  todos: state.todo.todos,
  userId: state.user.userId
}),{})(Header);
