import React from 'react';
import { withRouter } from 'react-router-dom';
import { historyShape } from 'react-router-props';
import {
  NavItem, Glyphicon, Modal, Form, FormGroup, FormControl, ControlLabel, Button, ButtonToolbar,
} from 'react-bootstrap';
import Toast from './Toast';

class IssueAddNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      toastVisible: false,
      toastMessage: '',
      toastType: 'success',
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.submit = this.submit.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  static get propTypes() {
    return {
      history: historyShape.isRequired,
    };
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal(e) {
    this.setState({ showing: false });
    e.stopPropagation();
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

  submit(e) {
    const { history } = this.props;
    e.preventDefault();
    this.hideModal(e);
    const form = document.forms.issueAdd;
    const newIssue = {
      owner: form.owner.value,
      title: form.title.value,
      status: 'New',
      created: new Date(),
    };
    fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue),
    }).then((response) => {
      if (response.ok) {
        response.json().then((updatedIssue) => {
          history.push({ pathname: `/issues/${updatedIssue._id}` });
        });
      } else {
        response.json().then((error) => {
          this.showError(`Error to add issue: ${error.message}`);
        });
      }
    }).catch((err) => {
      this.showError(`Error in sending data to server: ${err.message}`);
    });
  }

  render() {
    const {
      showing, toastVisible, toastType, toastMessage,
    } = this.state;
    return (
      <NavItem onClick={this.showModal}><Glyphicon glyph="plus" /> Create Issue
        <Modal keyboard show={showing} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Issue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form name="issueAdd">
              <FormGroup>
                <ControlLabel>Title</ControlLabel>
                <FormControl name="title" autoFocus />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Owner</ControlLabel>
                <FormControl name="owner" />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button type="button" bsStyle="primary" onClick={this.submit}>Submit</Button>
              <Button bsStyle="link" onClick={this.hideModal}>Cancel</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
        <Toast
          showing={toastVisible}
          bsStyle={toastType}
          message={toastMessage}
          onDismiss={this.dismissToast}
        />
      </NavItem>
    );
  }
}

export default withRouter(IssueAddNavItem);
