import React, { Component } from 'react';
import styles from './input-box.css';
// import { connect } from "react-redux";
// import { saveTask } from '../../reducers/actions/user'

console.log(styles);

class InputBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
      new_task_item: ''
    }
    this._handleSubmit = this._handleSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  _onChange(e) {
    this.setState({ new_task_item: e.target.value });
  }

  _handleSubmit(e) {
    if (this.state.new_task_item.length > 3) {
      this.props.handleSubmit({ text: this.state.new_task_item });
      this.setState({ new_task_item: '' })
    } else {
      this.setState({ errorMessage: 'Please enter a valid text' });
    }
  }

  render() {
    const {
      type,
      placeholder,
      name,
      classname
    } = this.props;

    const local_ref = name + '_' + type;

    return (
      <div className="wrapper-input">
        <input type={type} placeholder={placeholder} value={this.state.new_task_item} onChange={this._onChange} className={classname} onBlur={this._handleSubmit}/>
      </div>
    );
  }
}

export default InputBox;
