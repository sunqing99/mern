import React from 'react';
import PropTypes from 'prop-types';

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
        <form name="issueAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="owner" placeholder="Owner" />
          <input type="text" name="title" placeholder="Title" />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}
