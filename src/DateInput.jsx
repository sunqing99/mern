import React from 'react';
import PropTypes from 'prop-types';

export default class DateInput extends React.Component {
  static displayFormat(date) {
    return (date != null) ? date.toDateString() : '';
  }

  static editFormat(date) {
    // below will result in UTC, we want local
    // return (date != null) ? date.toISOString().substr(0, 10) : '';
    if (date === null) return '';
    const [month, day, year] = date.toLocaleDateString().split('/');
    let [m, d] = [month, day];
    if (month.length === 1) m = `0${month}`;
    if (day.length === 1) d = `0${day}`;
    return `${year}-${m}-${d}`;
  }

  static unformat(str) {
    // for yyyy-mm-dd format UTC will be assumed, so need to add time
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#ECMAScript_5_ISO-8601_format_support
    let dateStr = str;
    if (str.match(/^\d{4}-\d{2}-\d{2}$/)) dateStr = `${str}T00:00:00`;
    const val = new Date(dateStr);
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

  componentDidUpdate(oldProps) {
    const { value: newPropValue } = this.props;
    if (oldProps.value !== newPropValue) {
      /* eslint-disable react/no-did-update-set-state */
      // should be fine to call if-wrapped setState() and ignore lint warning
      // see https://github.com/airbnb/javascript/issues/1875
      this.setState({ value: DateInput.editFormat(newPropValue) });
      /* eslint-enable react/no-did-update-set-state */
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
      value: propsValue,
    } = this.props;
    const value = (stateFocused || !stateValid) ? stateValue : DateInput.displayFormat(propsValue);
    const childPros = Object.assign({}, this.props);
    delete childPros.onValidityChange;
    return (
      <input
        type="text"
        {...childPros}
        value={value}
        placeholder={stateFocused ? 'yyyy-mm-dd' : null}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChange={this.onChange}
      />
    );
  }
}
