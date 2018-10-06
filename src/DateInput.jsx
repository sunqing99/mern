import React from 'react';
import PropTypes from 'prop-types';

export default class DateInput extends React.Component {
  static displayFormat(date) {
    return (date != null) ? date.toDateString() : '';
  }

  static editFormat(date) {
    return (date != null) ? date.toISOString().substr(0, 10) : '';
  }

  static unformat(str) {
    const val = new Date(str);
    return Number.isNaN(val.getTime()) ? null : val;
  }

  constructor(props) {
    super(props);
    this.state = {
      value: DateInput.editFormat(props.value),
      focused: false,
      valid: true,
    };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  static get propTypes() {
    return {
      value: PropTypes.date,
      onValidityChange: PropTypes.func,
      onChange: PropTypes.func,
      name: PropTypes.string.isRequired,
    };
  }

  static get defaultProps() {
    return {
      value: null,
      onChange: () => { },
      onValidityChange: () => { },
    };
  }

  componentWillReceiveProps(newProps) {
    const { value: oldPropValue } = this.props;
    if (newProps.value !== oldPropValue) {
      this.setState({ value: DateInput.editFormat(newProps.value) });
    }
  }

  onFocus() {
    this.setState({ focused: true });
  }

  onBlur(e) {
    const { value: stateValue, valid: stateValid } = this.state;
    const { onValidityChange, onChange: propsOnChange } = this.props;
    const value = DateInput.unformat(stateValue);
    const valid = stateValue === '' || value != null;
    if (valid !== stateValid && onValidityChange) {
      onValidityChange(e, valid);
    }
    this.setState({ focused: false, valid });
    if (valid) propsOnChange(e, value);
  }

  onChange(e) {
    if (e.target.value.match(/^[\d-]*$/)) {
      this.setState({ value: e.target.value });
    }
  }

  render() {
    const {
      valid: stateValid,
      focused: stateFocused,
      value: stateValue,
    } = this.state;
    const {
      name: propsName,
      value: propsValue,
    } = this.props;
    const className = (!stateValid && !stateFocused) ? 'invalid' : null;
    const value = (stateFocused || !stateValid) ? stateValue : DateInput.displayFormat(propsValue);
    return (
      <input
        type="text"
        size={20}
        name={propsName}
        className={className}
        value={value}
        placeholder={stateFocused ? 'yyyy-mm-dd' : null}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChange={this.onChange}
      />
    );
  }
}
