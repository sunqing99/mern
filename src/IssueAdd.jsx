import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormControl, Button } from 'react-bootstrap';

export default class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // without this will get "'createIssue' is missing in props validation"
  static get propTypes() {
    return {
      createIssue: PropTypes.func.isRequired,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;
    // this.props.createIssue triggers "react/destructuring-assignment" lint warning
    const { createIssue } = this.props;
    createIssue({
      owner: form.owner.value,
      title: form.title.value,
      status: 'New',
      created: new Date(),
    });
    // clear the form for the next input
    form.owner.value = '';
    form.title.value = '';
  }

  render() {
    // console.log('Rendering IssueAdd');
    return (
      <div>
        <Form inline name="issueAdd" onSubmit={this.handleSubmit}>
          <FormControl name="owner" placeholder="Owner" />
          {' '}
          <FormControl name="title" placeholder="Title" />
          {' '}
          <Button type="submit" bsStyle="primary">Add</Button>
        </Form>
      </div>
    );
  }
}
