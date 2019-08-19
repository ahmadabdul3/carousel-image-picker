import React, { Component } from 'react';

export default class FormTextarea extends Component {
  constructor(props) {
    super(props);
  }

  onChange = (e) => {
    const { name, onChange } = this.props;
    const { value } = e.target;

    onChange({ name, value });
  }

  render() {
    const { labelText, name, value, message } = this.props;

    return (
      <div className='form-textarea'>
        <label className='form-textarea__label'>
          { labelText }
        </label>
        <textarea
          name={name}
          value={value}
          className='form-textarea__textarea'
          onChange={this.onChange}></textarea>
        <footer className='form-textarea__message'>
           { message }
        </footer>
      </div>
    );
  }
}
