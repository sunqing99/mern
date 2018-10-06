import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import NumInput from './NumInput';
import DateInput from './DateInput';

export default class IssueEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      issue: {
        _id: '',
        title: '',
        status: '',
        owner: '',
        effort: '',
        completionDate: null,
        created: '',
      },
      invalidFields: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
  }

  static get propTypes() {
    return {
      match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }).isRequired,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id } } } = this.props;
    if (prevProps.match.params.id !== id) {
      this.loadData();
    }
  }

  onValidityChange(event, valid) {
    const { invalidFields: stateInvalidFields } = this.state;
    const invalidFields = Object.assign({}, stateInvalidFields);
    if (!valid) {
      invalidFields[event.target.name] = true;
    } else {
      delete invalidFields[event.target.name];
    }
    this.setState({ invalidFields });
  }

  onChange(event, convertedValue) {
    const { issue: prevIssue } = this.state;
    const issue = Object.assign({}, prevIssue);
    const value = (convertedValue !== undefined) ? convertedValue : event.target.value;
    issue[event.target.name] = value;
    this.setState({ issue });
  }

  loadData() {
    const { match: { params: { id: issueId } } } = this.props;
    fetch(`/api/issues/${issueId}`).then((response) => {
      if (response.ok) {
        response.json().then((issue) => {
          issue.created = new Date(issue.created).toDateString();
          issue.completionDate = issue.completionDate != null
            ? new Date(issue.completionDate) : null;
          this.setState({ issue });
        });
      } else {
        response.json().then((error) => {
          alert(`Failed to fetch issue: ${error.message}`);
        });
      }
    }).catch((err) => {
      alert(`Error in fetching data from server: ${err.message}`);
    });
  }

  render() {
    const { issue, invalidFields } = this.state;
    const validationMessage = Object.keys(invalidFields).length === 0 ? null : (
      <div className="error">Please correct invalid fields before submitting</div>
    );
    return (
      <div>
        <form>
          ID: {issue._id}
          <br />
          Created: {issue.created}
          <br />
          Status:&nbsp;
          <select name="status" value={issue.status} onChange={this.onChange}>
            <option value="New">New</option>
            <option value="Open">Open</option>
            <option value="Assigned">Assigned</option>
            <option value="Fixed">Fixed</option>
            <option value="Verified">Verified</option>
            <option value="Closed">Closed</option>
          </select>
          <br />
          Owner: <input name="owner" value={issue.owner} onChange={this.onChange} />
          <br />
          Effort: <NumInput size={5} name="effort" value={issue.effort} onChange={this.onChange} />
          Completion Date:&nbsp;
          <DateInput
            name="completionDate"
            value={issue.completionDate}
            onChange={this.onChange}
            onValidityChange={this.onValidityChange}
          />
          <br />
          Title: <input name="title" size={50} value={issue.title} onChange={this.onChange} />
          <br />
          {validationMessage}
          <button type="submit">Submit</button>
        </form>
        <Link to="/issues">Back to issue list</Link>
      </div>
    );
  }
}
