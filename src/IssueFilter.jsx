import React from 'react';
import PropTypes from 'prop-types';
import {
  Col, Row, FormGroup, FormControl, ControlLabel, InputGroup, ButtonToolbar, Button,
} from 'react-bootstrap';

export default class IssueFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.initFilter.status || '',
      effort_gte: props.initFilter.effort_gte || '',
      effort_lte: props.initFilter.effort_lte || '',
      changed: false,
    };
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeEffortGte = this.onChangeEffortGte.bind(this);
    this.onChangeEffortLte = this.onChangeEffortLte.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  static get propTypes() {
    return {
      setFilter: PropTypes.func.isRequired,
      initFilter: PropTypes.shape({
        status: PropTypes.string,
        effort_gte: PropTypes.string,
        effort_lte: PropTypes.string,
        changed: PropTypes.bool,
      }).isRequired,
    };
  }

  onChangeStatus(e) {
    this.setState({ status: e.target.value, changed: true });
  }

  onChangeEffortGte(e) {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      this.setState({ effort_gte: e.target.value, changed: true });
    }
  }

  onChangeEffortLte(e) {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      this.setState({ effort_lte: e.target.value, changed: true });
    }
  }

  applyFilter() {
    const newFilter = {};
    const {
      status,
      effort_gte: effortGte,
      effort_lte: effortLte,
    } = this.state;
    const { setFilter } = this.props;
    if (status) newFilter.status = status;
    if (effortGte) newFilter.effort_gte = effortGte;
    if (effortLte) newFilter.effort_lte = effortLte;
    setFilter(newFilter);
  }

  resetFilter() {
    const {
      initFilter: {
        status,
        effort_gte: effortGte,
        effort_lte: effortLte,
      },
    } = this.props;
    this.setState({
      status: status || '',
      effort_gte: effortGte || '',
      effort_lte: effortLte || '',
      changed: false,
    });
  }

  clearFilter() {
    const { setFilter } = this.props;
    setFilter({});
  }

  render() {
    const {
      status,
      effort_gte: effortGte,
      effort_lte: effortLte,
      changed,
    } = this.state;
    return (
      <Row>
        <Col xs={6} sm={4} md={3} lg={2}>
          <FormGroup>
            <ControlLabel>Status</ControlLabel>
            <FormControl componentClass="select" value={status} onChange={this.onChangeStatus}>
              <option value="">(Any)</option>
              <option value="New">New</option>
              <option value="Open">Open</option>
              <option value="Assigned">Assigned</option>
              <option value="Fixed">Fixed</option>
              <option value="Verified">Verified</option>
              <option value="Closed">Closed</option>
            </FormControl>
          </FormGroup>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2}>
          <FormGroup>
            <ControlLabel>Effort</ControlLabel>
            <InputGroup>
              <FormControl value={effortGte} onChange={this.onChangeEffortGte} />
              <InputGroup.Addon>-</InputGroup.Addon>
              <FormControl value={effortLte} onChange={this.onChangeEffortLte} />
            </InputGroup>
          </FormGroup>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2}>
          <FormGroup>
            <ControlLabel>&nbsp;</ControlLabel>
            <ButtonToolbar>
              <Button bsStyle="primary" onClick={this.applyFilter}>Apply</Button>
              <Button onClick={this.resetFilter} disabled={!changed}>Reset</Button>
              <Button onClick={this.clearFilter}>Clear</Button>
            </ButtonToolbar>
          </FormGroup>
        </Col>
      </Row>
    );
  }
}
