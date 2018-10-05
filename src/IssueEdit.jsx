import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
        completionDate: '',
        created: '',
      },
    };
    this.onChange = this.onChange.bind(this);
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

  onChange(event) {
    const { issue: prevIssue } = this.state;
    const issue = Object.assign({}, prevIssue);
    issue[event.target.name] = event.target.value;
    this.setState({ issue });
  }

  loadData() {
    const { match: { params: { id: issueId } } } = this.props;
    fetch(`/api/issues/${issueId}`).then((response) => {
      if (response.ok) {
        response.json().then((issue) => {
          issue.created = new Date(issue.created).toDateString();
          issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate).toDateString() : '';
          issue.effort = issue.effort != null ? issue.effort.toString() : '';
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
    const { issue } = this.state;
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
          Effort: <input size={5} name="effort" value={issue.effort} onChange={this.onChange} />
          Completion Date: <input name="completionDate" value={issue.completionDate} onChange={this.onChange} />
          <br />
          Title: <input name="title" size={50} value={issue.title} onChange={this.onChange} />
          <br />
          <button type="submit">Submit</button>
        </form>
        <Link to="/issues">Back to issue list</Link>
      </div>
    );
  }
}
