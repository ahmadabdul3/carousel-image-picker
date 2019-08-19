import React, { PureComponent } from 'react';

export default class Button extends PureComponent {
  static BLUE = 'blue';
  static GREEN = 'green';
  static RED = 'red';

  static defaultProps = {
    customClass: '',
    tooltipText: 'This button is disabled',
    color: Button.BLUE,
  };

  get buttonClass() {
    const { color, customClass } = this.props;
    return `button button-${color} ${customClass}`;
  }

  get containerClass() {
    const { fullWidth, disabled } = this.props;
    let klass = 'button-container';
    if (fullWidth) klass += ' full-width';
    if (disabled) klass += ' disabled';
    return klass;
  }

  // - the tooltip renders when the button is disabled
  render() {
    const {
      text,
      disabled,
      handleClick,
      tooltipText,
    } = this.props;

    return (
      <div className={this.containerClass}>
        <button
          disabled={disabled}
          onClick={handleClick}
          className={this.buttonClass}
        >
          { text }
        </button>
        <div className='button-tooltip'>
          { tooltipText }
        </div>
      </div>
    );
  }
}
