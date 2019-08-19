import React, { PureComponent } from 'react';
import Select from 'react-select';

export default class FormSelect extends PureComponent {
  static defaultProps = {
    isClearable: true,
  };

  selectRef = null;
  focused = false;
  options = this.optionsAsObject;
  state = { active: false };

  get optionsAsObject() {
    return this.props.options.reduce((all, option) => {
      all[option.value] = option;
      return all;
    }, {});
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.props.value) this.setState({ active: true });
    }, 200);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      if (!this.focused) {
        this.setState({
          active: !!this.props.value,
        });
      }
    }
  }

  handleFocus = () => {
    this.setState({ active: true });
    this.focused = true;
  }

  handleBlur = () => {
    this.focused = false;
    if (!this.props.value) {
      this.setState({ active: false });
    }
  }

  focusSelect = () => {
    this.selectRef.focus();
  }

  onChange = (option) => {
    const value = option && option.value;
    const { name, onChange } = this.props;
    onChange({ value, name });
  };

  get value() {
    return this.options[this.props.value] || '';
  }

  render() {
    const {
      onChange,
      options,
      labelText,
      message,
      autoFocus,
      isClearable
    } = this.props;
    const { active } = this.state;
    let klass = 'form-input';
    if (active) klass += ' active';
    if (message) klass += ' error';

    return (
      <div className={klass}>
        <div className='form-input__label-input-wrapper'>
          <label className='form-input__label' onClick={this.focusSelect}>
            { labelText }
          </label>
          <Select
            ref={(select) => { this.selectRef = select; }}
            className='px-select'
            classNamePrefix='px-select'
            placeholder=''
            isClearable={isClearable}
            value={this.value}
            openMenuOnFocus
            onChange={this.onChange}
            options={options}
            autoFocus={autoFocus}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </div>
        <footer className='form-input__message'>
          { message }
        </footer>
      </div>
    );
  }
}

export class FormSelectState extends PureComponent {
  render() {
    const { onChange, message, isRequired, name, value } = this.props;
    let placeholder = 'State';
    if (isRequired) placeholder += '*';

    return (
      <FormSelect
        placeholder={placeholder}
        name={name}
        labelText='State*'
        value={value}
        message={message}
        onChange={onChange}
        options={getStateOptions()}
      />
    );
  }
}

function getStateOptions() {
  return [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AS', label: 'American Samoa' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'DC', label: 'District Of Columbia' },
    { value: 'FM', label: 'Federated States Of Micronesia' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'GU', label: 'Guam' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MH', label: 'Marshall Islands' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'MP', label: 'Northern Mariana Islands' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PW', label: 'Palau' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'PR', label: 'Puerto Rico' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VI', label: 'Virgin Islands' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
  ].map(option => {
    const { label } = option;
    return { label, value: label };
  });
}
