import React, { Component } from 'react';
import { connect } from "react-redux";
import { signUp, login } from '../../reducers/actions/user'
import './header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        password: ''
      }
    };
  }

  handleSignUpSubmit(e) {
    e.preventDefault();
    const email = this.refs.signup_email.value;
    const password = this.refs.signup_password.value;
    this.props.signUp({ email, password });
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    const email = this.refs.login_email.value;
    const password = this.refs.login_password.value;
    this.props.login({ email, password });
  }

  renderSignUpForm() {
    return (
      <form onSubmit={(e) => this.handleSignUpSubmit(e)}>
        <input type="text" placeholder="Enter email" ref="signup_email"/>
        <input type="text" placeholder="Enter password" ref="signup_password"/>
        <input type="submit" value="Sign Up" />
      </form>
    )
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

  renderTodoItem(todo) {
    return (
      <div>{todo.text}</div>
    );
  }

  renderTodoList() {
    const { todos } = this.props;
    return (
      <div>
        {todos.length > 0 && todos.map(todo => this.renderTodoItem(todo))}
      </div>
    );
  }

  render() {
    return (
      <div className="header">
        <div className="header-title">Todo Application</div>
        {this.renderSignUpForm()}
        {this.renderLoginForm()}
        {this.props.loggedIn && this.renderTodoList()}
      </div>
    );
  }
};

export default connect(state => ({
  loggedIn: state.user.loggedIn,
  todos: state.todo.todos
}),{ signUp, login })(Header);
