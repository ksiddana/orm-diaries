import React, { Component } from 'react';
import { connect } from "react-redux";

import InputBox from '../input-box/input-box';
import { fetchTodoTaskList, createTask, deleteTodoTask, updateEditedTask } from '../../reducers/actions/user'
import './main.css';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showInput: false,
      itemBeingEdited: { todo: { text: '', _id: '' } }
    }
    this.editTodoItem = this.editTodoItem.bind(this);
    this.updateTodoItem = this.updateTodoItem.bind(this);
    this.saveUpdatedTodoItem = this.saveUpdatedTodoItem.bind(this);
  }

  componentDidMount() {
    const { loggedIn } = this.props;
    this.props.fetchTodoTaskList();
  }

  deleteTodoItem(id) {
    this.props.deleteTodoTask(id);
  }

  editTodoItem(todo) {
    this.setState({
      showInput: true,
      itemBeingEdited: { todo }
    });
  }

  updateTodoItem(event, todo) {
    const { itemBeingEdited } = this.state;
    this.setState({
      itemBeingEdited: {
        todo: {
          ...itemBeingEdited.todo,
          text: event.target.value
        }
      }
    });
  }

  saveUpdatedTodoItem(initialTodoItem, updatedTodoItem) {
    if (initialTodoItem.text !== updatedTodoItem.todo.text) {
      this.props.updateEditedTask(updatedTodoItem);
    }
  }

  renderTodoItem(todo) {
    const { itemBeingEdited } = this.state;
    // console.log("2. itemBeingEdited ", itemBeingEdited.todo.text);
    if (todo._id === itemBeingEdited.todo._id) {
      return (
        <div key={todo._id} className="main-todo-item">
          {this.state.showInput && (
            <input
              value={itemBeingEdited.todo.text}
              onChange={(e) => this.updateTodoItem(e, todo)}
              onBlur={this.saveUpdatedTodoItem.bind(this, todo, itemBeingEdited)}
            />
          )}
          <button onClick={() => this.deleteTodoItem(todo._id)}><i className="fas fa-trash-alt"></i></button>
        </div>
      );
    } else {
      return (
        <div key={todo._id} className="main-todo-item">
          <input readOnly value={todo.text} onClick={this.editTodoItem.bind(this, todo)} />
          <button onClick={() => this.deleteTodoItem(todo._id)}><i className="fas fa-trash-alt"></i></button>
        </div>
      );
    }
  }

  renderTodoList() {
    const { todos, createTask } = this.props;
    return (
      <div>
        <div className="main-todo-list">
          {todos && todos.length > 0 && todos.map(todo => this.renderTodoItem(todo))}
        </div>
        <InputBox
          name="new_task"
          type="text"
          placeholder="Enter new task ..."
          handleSubmit={createTask}
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

export default connect(
  state => ({
    loggedIn: state.user.loggedIn,
    todos: state.todo.todos,
    userId: state.user.userId
  }),
  {
    fetchTodoTaskList,
    createTask,
    deleteTodoTask,
    updateEditedTask
  })(Main);
