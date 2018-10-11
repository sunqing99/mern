import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import {
  Button, Glyphicon, Table, Panel,
} from 'react-bootstrap';
import 'whatwg-fetch';

import IssueFilter from './IssueFilter';
import Toast from './Toast';

const IssueRow = ({ issue, deleteIssue }) => {
  const {
    _id, status, owner, created, effort, completionDate, title,
  } = issue;

  function onDeleteClick() {
    deleteIssue(_id);
  }

  return (
    <tr>
      <td><Link to={`/issues/${_id}`}>{_id.substr(-4)}</Link></td>
      <td>{status}</td>
      <td>{owner}</td>
      <td>{created.toDateString()}</td>
      <td>{effort}</td>
      <td>{completionDate ? completionDate.toDateString() : 'Not completed'}</td>
      <td>{title}</td>
      <td>
        <Button bsSize="xsmall" onClick={onDeleteClick}><Glyphicon glyph="trash" /></Button>
      </td>
    </tr>
  );
};

IssueRow.propTypes = {
  issue: PropTypes.shape({ _id: PropTypes.string }).isRequired,
  deleteIssue: PropTypes.func.isRequired,
};

function IssueTable({ issues, deleteIssue }) {
  const issueRows = issues.map(
    issue => <IssueRow key={issue._id} issue={issue} deleteIssue={deleteIssue} />,
  );
  return (
    <Table bordered condensed hover responsive>
      <thead>
        <tr>
          <th>Id</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Completion Date</th>
          <th>Title</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {issueRows}
      </tbody>
    </Table>
  );
}

IssueTable.propTypes = {
  issues: PropTypes.arrayOf(PropTypes.shape({ _id: PropTypes.string })).isRequired,
  deleteIssue: PropTypes.func.isRequired,
};

export default class IssueList extends React.Component {
  constructor() {
    super();
    this.state = {
      issues: [],
      toastVisible: false,
      toastMessage: '',
      toastType: 'success',
    };
    this.setFilter = this.setFilter.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
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
    if (oldQuery.status === newQuery.status
      && oldQuery.effort_gte === newQuery.effort_gte
      && oldQuery.effort_lte === newQuery.effort_lte) {
      return;
    }
    this.loadData();
  }

  setFilter(query) {
    const { history, location: { pathname } } = this.props;
    history.push({ pathname, search: queryString.stringify(query) });
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
          this.showError(`Failed to fetch issues: ${error.message}`);
        });
      }
    }).catch((error) => {
      this.showError(`Error in fetch data from server: ${error}`);
    });
  }

  deleteIssue(id) {
    fetch(`/api/issues/${id}`, { method: 'DELETE' }).then((response) => {
      if (!response.ok) this.showError('Failed to delete issue');
      else this.loadData();
    }).catch((err) => {
      this.showError(`Error in sending data to server: ${err.message}`);
    });
  }

  showError(message) {
    this.setState({
      toastVisible: true,
      toastMessage: message,
      toastType: 'danger',
    });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  render() {
    const {
      issues, toastVisible, toastType, toastMessage,
    } = this.state;
    const { location: { search } } = this.props;
    const initFilter = queryString.parse(search);
    return (
      <div>
        <Panel id="collapsible-panel">
          <Panel.Heading>
            <Panel.Title toggle>
              Filter
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <IssueFilter setFilter={this.setFilter} initFilter={initFilter} />
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
        <IssueTable issues={issues} deleteIssue={this.deleteIssue} />
        <Toast
          showing={toastVisible}
          bsStyle={toastType}
          message={toastMessage}
          onDismiss={this.dismissToast}
        />
      </div>
    );
  }
}
