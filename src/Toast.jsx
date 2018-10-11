import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Collapse } from 'react-bootstrap';

export default class Toast extends React.Component {
  componentDidUpdate() {
    const { showing, onDismiss } = this.props;
    if (showing) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = setTimeout(onDismiss, 5000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.dismissTimer);
  }

  static get propTypes() {
    return {
      showing: PropTypes.bool.isRequired,
      onDismiss: PropTypes.func.isRequired,
      bsStyle: PropTypes.string,
      message: PropTypes.string.isRequired,
    };
  }

  static get defaultProps() {
    return {
      bsStyle: 'success',
    };
  }

  render() {
    const {
      showing, onDismiss, bsStyle, message,
    } = this.props;
    return (
      <Collapse in={showing}>
        <div
          style={{
            position: 'fixed', top: 30, left: 0, right: 0, textAlign: 'center',
          }}
        >
          <Alert style={{ display: 'inline-block', width: 500 }} bsStyle={bsStyle} onDismiss={onDismiss}>
            {message}
          </Alert>
        </div>
      </Collapse>
    );
  }
}
