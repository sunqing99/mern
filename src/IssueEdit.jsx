import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup, FormControl, ControlLabel, ButtonToolbar, Button, Panel, Form, Col, Alert,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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
        effort: null,
        completionDate: null,
        created: null,
      },
      invalidFields: {},
      showingValidation: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.dismissValidation = this.dismissValidation.bind(this);
    this.showValidation = this.showValidation.bind(this);
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

  onSubmit(event) {
    const { invalidFields, issue } = this.state;
    const { match: { params: { id } } } = this.props;
    event.preventDefault();
    this.showValidation();
    if (Object.keys(invalidFields).length !== 0) {
      return;
    }
    fetch(`/api/issues/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(issue),
    }).then((response) => {
      if (response.ok) {
        response.json().then((updatedIssue) => {
          updatedIssue.created = new Date(updatedIssue.created);
          if (updatedIssue.completionDate) {
            updatedIssue.completionDate = new Date(updatedIssue.completionDate);
          }
          this.setState({ issue: updatedIssue });
          alert('Updated issue successfully.');
        });
      } else {
        response.json().then((error) => {
          alert(`Failed to update issue: ${error.message}`);
        });
      }
    }).catch((err) => {
      alert(`Error in sending data to server: ${err.message}`);
    });
  }

  loadData() {
    const { match: { params: { id: issueId } } } = this.props;
    fetch(`/api/issues/${issueId}`).then((response) => {
      if (response.ok) {
        response.json().then((issue) => {
          issue.created = new Date(issue.created);
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

  showValidation() {
    this.setState({ showingValidation: true });
  }

  dismissValidation() {
    this.setState({ showingValidation: false });
  }

  render() {
    const { issue, invalidFields, showingValidation } = this.state;
    let validationMessage = null;
    if (Object.keys(invalidFields).length !== 0 && showingValidation) {
      validationMessage = (
        <Alert bsStyle="danger" onDismiss={this.dismissValidation}>
          Please correct invalid fields before submitting.
        </Alert>
      );
    }

    return (
      <Panel id="edit-issue-panel">
        <Panel.Heading>
          <Panel.Title>Edit Issue</Panel.Title>
        </Panel.Heading>
        <Form horizontal onSubmit={this.onSubmit}>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>ID</Col>
            <Col sm={9}>
              <FormControl.Static>{issue._id}</FormControl.Static>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Created</Col>
            <Col sm={9}>
              <FormControl.Static>
                {issue.created ? issue.created.toDateString() : ''}
              </FormControl.Static>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Status</Col>
            <Col sm={9}>
              <FormControl componentClass="select" name="status" value={issue.status} onChange={this.onChange}>
                <option value="New">New</option>
                <option value="Open">Open</option>
                <option value="Assigned">Assigned</option>
                <option value="Fixed">Fixed</option>
                <option value="Verified">Verified</option>
                <option value="Closed">Closed</option>
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Owner</Col>
            <Col sm={9}>
              <FormControl name="owner" value={issue.owner} onChange={this.onChange} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Effort</Col>
            <Col sm={9}>
              <FormControl componentClass={NumInput} name="effort" value={issue.effort} onChange={this.onChange} />
            </Col>
          </FormGroup>
          <FormGroup validationState={invalidFields.completionDate ? 'error' : null}>
            <Col componentClass={ControlLabel} sm={3}>Completion Date</Col>
            <Col sm={9}>
              <FormControl
                componentClass={DateInput}
                name="completionDate"
                value={issue.completionDate}
                onChange={this.onChange}
                onValidityChange={this.onValidityChange}
              />
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Title</Col>
            <Col sm={9}>
              <FormControl name="title" value={issue.title} onChange={this.onChange} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={3} sm={6}>
              <ButtonToolbar>
                <Button type="submit" bsStyle="primary">Submit</Button>
                <LinkContainer to="/issues"><Button bsStyle="link">Back</Button></LinkContainer>
              </ButtonToolbar>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={3} sm={9}>{validationMessage}</Col>
          </FormGroup>
        </Form>
      </Panel>
    );
  }
}
