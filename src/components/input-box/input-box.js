import React, { Component } from 'react';
import styles from './input-box.css';
// import { connect } from "react-redux";
// import { saveTask } from '../../reducers/actions/user'

console.log(styles);

class InputBox extends Component {
  constructor(props) {
    super(props);

    this._handleSubmit = this._handleSubmit.bind(this);
    // this.saveTaskInput = this.saveTaskInput.bind(this);
  }

  _handleSubmit() {
    this.props.handleSubmit({
      text: this.refs.new_task_text.value
    })
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
        <input type={type} placeholder={placeholder} ref={local_ref} className={classname} onBlur={this._handleSubmit}/>
      </div>
    );
  }
}

export default InputBox;
