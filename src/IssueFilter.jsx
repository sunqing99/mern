import React from 'react';
import PropTypes from 'prop-types';

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
      <div>
        Status:
        <select value={status} onChange={this.onChangeStatus}>
          <option value="">(Any)</option>
          <option value="New">New</option>
          <option value="Open">Open</option>
          <option value="Assigned">Assigned</option>
          <option value="Fixed">Fixed</option>
          <option value="Verified">Verified</option>
          <option value="Closed">Closed</option>
        </select>
        &nbsp;Effort between:
        <input size={5} value={effortGte} onChange={this.onChangeEffortGte} />
        &nbsp;-&nbsp;
        <input size={5} value={effortLte} onChange={this.onChangeEffortLte} />
        <button type="button" onClick={this.applyFilter}>Apply</button>
        <button type="button" onClick={this.resetFilter} disabled={!changed}>Reset</button>
        <button type="button" onClick={this.clearFilter}>Clear</button>
      </div>
    );
  }
}
