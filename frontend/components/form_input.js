import React, { PureComponent } from 'react';

export default class FormInput extends PureComponent {
  focused = false;
  inputRef = null;
  state = {
    active: false,
  };

  componentDidMount() {
    if (this.props.autoFocus) this.focusInput();
    else {
      setTimeout(() => {
        if (this.inputRef.value) this.setState({ active: true });
      }, 200);
    }
  }

  // - the reason this lifecycle hook and 'this.focused' exist is because
  //   when the input value is controlled
  //   (meaning the value for this input is stored in some component's state)
  //   and is cleared from the outside,
  //   (meaning the component whose state is storing the value
  //   uses 'this.setState' to clear the value)
  //   this input component needs to go back to the inactive state
  //   (meaning, the underline for this component should not still have
  //   a green color and the placeholder should shift back down and enlarge)
  // - theoretically this only happens when the scenario above is encountered
  //   (clearing out form input values programmatically using this.setState)
  //   so the active value should always evaluate to 'false'
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      if (!this.focused) this.setState({ active: !!this.props.value });
    }
  }

  handleFocus = () => {
    this.setState({ active: true });
    this.focused = true;
  }

  handleBlur = (e) => {
    this.focused = false;
    if (!e.target.value) {
      this.setState({ active: false });
    }
  }

  focusInput = () => {
    this.inputRef.focus();
  }

  onChange = (e) => {
    const { name, onChange } = this.props;
    const { value } = e.target;

    onChange({ name, value }, e);
  }

  render() {
    const { labelText, type, name, value, message } = this.props;
    const { active } = this.state;
    let klass = 'form-input';
    if (active) klass += ' active';
    if (message) klass += ' error';

    return (
      <div className={klass}>
        <div className='form-input__label-input-wrapper'>
          <label className='form-input__label' onClick={this.focusInput}>
            { labelText }
          </label>
          <input
            ref={(input) => { this.inputRef = input; }}
            name={name}
            value={value}
            type={type}
            className='form-input__input'
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChange={this.onChange} />
        </div>
        <footer className='form-input__message'>
           { message }
        </footer>
      </div>
    );
  }
}
