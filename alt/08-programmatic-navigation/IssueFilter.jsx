// alternative implementation:
//   instead of having withRouter for IssueList, have it here in IssueFilter
//
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

class IssueFilter extends React.Component {
  constructor() {
    super();
    this.setStatus = this.setStatus.bind(this);
    this.setStatusAssigned = this.setStatusAssigned.bind(this);
    this.setStatusOpen = this.setStatusOpen.bind(this);
    this.setStatusAll = this.setStatusAll.bind(this);
  }

  static get propTypes() {
    return {
      location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
      history: PropTypes.shape({ length: PropTypes.number }).isRequired,
    };
  }

  setStatus(status) {
    const { history, location: { pathname } } = this.props;
    let search;
    if (status !== 'All') {
      search = queryString.stringify({ status });
    } else {
      search = '';
    }
    history.push({ pathname, search });
  }

  setStatusOpen(e) {
    e.preventDefault();
    this.setStatus('Open');
  }

  setStatusAssigned(e) {
    e.preventDefault();
    this.setStatus('Assigned');
  }

  setStatusAll(e) {
    e.preventDefault();
    this.setStatus('All');
  }

  render() {
    const Separator = () => <span> | </span>;
    /*
        console.log('Print out props: ', JSON.stringify(this.props, null, 2));
        {
          "match": {
            "path": "/issues",
            "url": "/issues",
            "isExact": true,
            "params": {}
          },
          "location": {
            "pathname": "/issues",
            "search": "?status=Assigned",
            "hash": ""
          },
          "history": {
            "length": 35,
            "action": "POP",
            "location": {
              "pathname": "/issues",
              "search": "?status=Assigned",
              "hash": ""
            }
          }
        }
    */
    return (
      <div>
        <button type="button" onClick={this.setStatusAll}>All Issues</button>
        <Separator />
        <button type="button" onClick={this.setStatusOpen}>Open</button>
        <Separator />
        <button type="button" onClick={this.setStatusAssigned}>Assigned</button>
      </div>
    );
  }
}

export default withRouter(IssueFilter);
