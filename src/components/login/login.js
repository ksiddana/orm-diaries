import React, { Component } from 'react';
import { connect } from "react-redux";
import { login, logout } from '../../reducers/actions/user'
import './login.css';
import Cookies from 'universal-cookie';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        password: ''
      }
    };
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.logout();
    }
  }

  handleLoginSubmit(e) {
    const { history } = this.props;
    e.preventDefault();
    const email = this.refs.login_email.value;
    const password = this.refs.login_password.value;
    this.props.login({ email, password });
    history.push('/');

  }

  renderLoginForm() {
    return (
      <form onSubmit={(e) => this.handleLoginSubmit(e)}>
        <input type="text" placeholder="Enter email" ref="login_email"/>
        <input type="text" placeholder="Enter password" ref="login_password"/>
        <input type="submit" value="Login" />
      </form>
    )
  }

  render() {
    return (
      <div className="header">
        {this.renderLoginForm()}
      </div>
    );
  }
};

export default connect(state => ({
  loggedIn: state.user.loggedIn,
  todos: state.todo.todos
}),{ login, logout })(Login);
