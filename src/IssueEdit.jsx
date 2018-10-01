import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function IssueEdit({ match }) {
  return (
    <div>
      <p>
        Placeholder for editing issue {match.params.id}
      </p>
      <Link to="/issues">Back to issue list</Link>
    </div>
  );
}

IssueEdit.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }).isRequired,
};
