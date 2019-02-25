import React, { Component } from 'react';
import { connect } from "react-redux";
import { signUp } from '../../reducers/actions/user'
import './signup.css';

class SignUp extends Component {
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

  renderSignUpForm() {
    return (
      <form onSubmit={(e) => this.handleSignUpSubmit(e)}>
        <input type="text" placeholder="Enter email" ref="signup_email"/>
        <input type="text" placeholder="Enter password" ref="signup_password"/>
        <input type="submit" value="Sign Up" />
      </form>
    )
  }

  render() {
    return (
      <div className="header">
        {this.renderSignUpForm()}
      </div>
    );
  }
};

export default connect(state => ({}),{ signUp })(SignUp);
