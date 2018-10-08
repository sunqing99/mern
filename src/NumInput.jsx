import React from 'react';
import PropTypes from 'prop-types';

export default class NumInput extends React.Component {
  static format(num) {
    return num != null ? num.toString() : '';
  }

  static unformat(str) {
    const val = parseInt(str, 10);
    return Number.isNaN(val) ? null : val;
  }

  constructor(props) {
    super(props);
    this.state = { value: NumInput.format(props.value) };
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  static get propTypes() {
    return {
      value: PropTypes.number,
      onChange: PropTypes.func.isRequired,
    };
  }

  static get defaultProps() {
    return {
      value: null,
    };
  }

  componentDidUpdate(oldProps) {
    const { value: newValue } = this.props;
    if (oldProps.value !== newValue) {
      /* eslint-disable react/no-did-update-set-state */
      this.setState({ value: NumInput.format(newValue) });
      /* eslint-enable react/no-did-update-set-state */
    }
  }

  onBlur(e) {
    const { onChange: parentOnChange } = this.props;
    const { value: strValue } = this.state;
    parentOnChange(e, NumInput.unformat(strValue));
  }

  onChange(e) {
    if (e.target.value.match(/^\d*$/)) {
      this.setState({ value: e.target.value });
    }
  }

  render() {
    const { value: stateValue } = this.state;
    return (
      <input type="text" {...this.props} value={stateValue} onBlur={this.onBlur} onChange={this.onChange} />
    );
  }
}
