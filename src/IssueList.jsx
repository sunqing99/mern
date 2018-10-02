import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import 'whatwg-fetch';

import IssueAdd from './IssueAdd';
import IssueFilter from './IssueFilter';

const hdrText = 'Issue Tracker';

const IssueRow = ({ issue }) => {
  const {
    _id, status, owner, created, effort, completionDate, title,
  } = issue;
  return (
    <tr>
      <td><Link to={`/issues/${_id}`}>{_id.substr(-4)}</Link></td>
      <td>{status}</td>
      <td>{owner}</td>
      <td>{created.toDateString()}</td>
      <td>{effort}</td>
      <td>{completionDate ? completionDate.toDateString() : 'Not completed'}</td>
      <td>{title}</td>
    </tr>
  );
};

IssueRow.propTypes = {
  issue: PropTypes.shape({ _id: PropTypes.string }).isRequired,
};

function IssueTable({ issues }) {
  const issueRows = issues.map(
    issue => <IssueRow key={issue._id} issue={issue} />,
  );
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Completion Date</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {issueRows}
      </tbody>
    </table>
  );
}

IssueTable.propTypes = {
  issues: PropTypes.arrayOf(PropTypes.shape({ _id: PropTypes.string })).isRequired,
};

export default class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this);
    this.setFilter = this.setFilter.bind(this);
  }

  static get propTypes() {
    return {
      location: PropTypes.shape({ search: PropTypes.string.isRequired }).isRequired,
      history: PropTypes.shape({ length: PropTypes.number }).isRequired,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const oldQuery = queryString.parse(prevProps.location.search);
    const newQuery = queryString.parse(location.search);
    if (oldQuery.status === newQuery.status) {
      return;
    }
    this.loadData();
  }

  setFilter(search) {
    const { history, location: { pathname } } = this.props;
    history.push({ pathname, search });
  }

  loadData() {
    const { location } = this.props;
    fetch(`/api/issues${location.search}`).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          // console.log("Total count of records:", data._metadata.total_count);
          data.records.forEach((issue) => {
            issue.created = new Date(issue.created);
            if (issue.completionDate) {
              issue.completionDate = new Date(issue.completionDate);
            }
          });
          this.setState({ issues: data.records });
        });
      } else {
        response.json().then((error) => {
          alert(`Failed to fetch issues: ${error.message}`);
        });
      }
    }).catch((error) => {
      alert(`Error in fetch data from server: ${error}`);
    });
  }

  createIssue(newIssue) {
    fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue),
    }).then((response) => {
      if (response.ok) {
        response.json().then((updatedIssue) => {
          updatedIssue.created = new Date(updatedIssue.created);
          if (updatedIssue.completionDate) {
            updatedIssue.completionDate = new Date(updatedIssue.completionDate);
          }
          const { issues } = this.state;
          const newIssues = issues.concat(updatedIssue);
          this.setState({ issues: newIssues });
        });
      } else {
        response.json().then((error) => {
          alert(`Failed to add issue: ${error.message}`);
        });
      }
    }).catch((err) => {
      alert(`Error in sending data to server: ${err.message}`);
    });
  }

  render() {
    const { issues } = this.state;
    return (
      <div>
        <IssueFilter setFilter={this.setFilter} />
        <hr />
        <IssueTable issues={issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </div>
    );
  }
}
