import React, { Component } from 'react';
import { connect } from "react-redux";

import InputBox from '../input-box/input-box';
import { fetchTodoList, saveTask, deleteTodoItem } from '../../reducers/actions/user'
import './main.css';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { loggedIn } = this.props;
    this.props.fetchTodoList();
  }

  deleteTodoItem(id) {
    this.props.deleteTodoItem(id);
  }

  renderTodoItem(todo) {
    return (
      <div key={todo._id} className="main-todo-item">
        <div>{todo.text}</div>
        <button onClick={() => this.deleteTodoItem(todo._id)}><i className="fas fa-trash-alt"></i></button>
      </div>
    );
  }

  renderTodoList() {
    const { todos, saveTask } = this.props;
    return (
      <div>
        {todos && todos.length > 0 && todos.map(todo => this.renderTodoItem(todo))}
        <InputBox
          name="new_task"
          type="text"
          placeholder="Enter new task ..."
          handleSubmit={saveTask}
        />
      </div>
    );
  }

  render() {
    const { loggedIn } = this.props;
    return (
      <div className="">
        <div className="header-title">Simple Tasks</div>
        {/* {!loggedIn && <div>logged out</div>} */}
        {this.renderTodoList()}
      </div>
    );
  }
};

export default connect(state => ({
  loggedIn: state.user.loggedIn,
  todos: state.todo.todos,
  userId: state.user.userId
}),{ fetchTodoList, saveTask, deleteTodoItem })(Main);
