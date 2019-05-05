import React, { Component } from 'react';
import { connect } from "react-redux";

import InputBox from '../input-box/input-box';
import { fetchTodoList, saveTask } from '../../reducers/actions/user'
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

export default connect(state => ({}),{ fetchTodoList, saveTask })(Main);
