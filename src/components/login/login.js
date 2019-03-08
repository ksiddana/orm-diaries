import React, { Component } from 'react';
import { connect } from "react-redux";
import { login, logout } from '../../reducers/actions/user'
import styles from './login.css';
import Cookies from 'universal-cookie';

console.log(styles);

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
    const payload = {}
    const { history } = this.props;
    e.preventDefault();
    payload.email = this.refs.login_email.value;
    payload.password = this.refs.login_password.value;
    this.props.login(payload, history);
  }

  renderLoginForm() {
    return (
      <div className="login-form">
        <div className="login-title">Welcome</div>
        <form onSubmit={(e) => this.handleLoginSubmit(e)}>

          <div className="wrapper-input">
            <input type="text" placeholder="Enter email" ref="login_email" className="login-email"/>
            <span className="focus-input"></span>
          </div>

          <div className="wrapper-input">
            <input type="text" placeholder="Enter password" ref="login_password" className="login-password"/>
            <span className="focus-input"></span>
          </div>

          <div className="login-button-container">
            <div className="wrapper-loggin-button">
              <div className="loggin-button-bgbtn">
                <button className="login-button"><span>Login</span></button>
              </div>
            </div>
          </div>

        </form>
      </div>
    );
  }

  render() {
    return (
      <div className="">
        {this.renderLoginForm()}
      </div>
    );
  }
};

export default connect(state => ({
  loggedIn: state.user.loggedIn,
  todos: state.todo.todos
}),{ login, logout })(Login);
