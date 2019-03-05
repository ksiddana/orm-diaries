import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchTodoList } from '../../reducers/actions/user'
import './main.css';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { loggedIn } = this.props;
    this.props.fetchTodoList();
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
    const { loggedIn } = this.props;
    return (
      <div className="">
        <div className="header-title">Todo Application</div>
        {!loggedIn && <div>logged out</div>}
        {loggedIn && this.renderTodoList()}
      </div>
    );
  }
};

export default connect(state => ({
  loggedIn: state.user.loggedIn,
  todos: state.todo.todos,
  userId: state.user.userId
}),{ fetchTodoList })(Main);
