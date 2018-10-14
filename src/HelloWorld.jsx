import React from 'react';
import PropTypes from 'prop-types';

export default class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props);
  }

  static get propTypes() {
    return {
      addressee: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    };
  }

  static get defaultProps() {
    return {
      addressee: '',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ addressee: 'Universe' });
    }, 100);
  }

  render() {
    const { addressee } = this.state;
    return (
      <h1>Hello {addressee}!</h1>
    );
  }
}
