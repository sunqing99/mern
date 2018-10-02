import React from 'react';
import PropTypes from 'prop-types';

export default class IssueFilter extends React.Component {
  constructor() {
    super();
    this.clearFilter = this.clearFilter.bind(this);
    this.setFilterOpen = this.setFilterOpen.bind(this);
    this.setFilterAssigned = this.setFilterAssigned.bind(this);
  }

  static get propTypes() {
    return {
      setFilter: PropTypes.func.isRequired,
    };
  }

  setFilterOpen() {
    const { setFilter } = this.props;
    // using "button", so no need to preventDefault()
    // e.preventDefault();
    setFilter('?status=Open');
  }

  setFilterAssigned() {
    const { setFilter } = this.props;
    // e.preventDefault();
    setFilter('?status=Assigned');
  }

  clearFilter() {
    const { setFilter: sf } = this.props;
    // e.preventDefault();
    sf('');
  }

  render() {
    const Separator = () => <span> | </span>;
    return (
      <div>
        <button type="button" onClick={this.clearFilter}>All Issues</button>
        <Separator />
        <button type="button" onClick={this.setFilterOpen}>Open</button>
        <Separator />
        <button type="button" onClick={this.setFilterAssigned}>Assigned</button>
      </div>
    );
  }
}
