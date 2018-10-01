import React from 'react';
import { Link } from 'react-router-dom';

export default function IssueFilter() {
  const Separator = () => <span> | </span>;
  return (
    <div>
      <Link to="/issues">All Issues</Link>
      <Separator />
      <Link to={{ pathname: '/issues', query: { status: 'Open' } }}>Open Issues</Link>
      <Separator />
      <Link to="/issues?status=Assigned">Assigned Issues</Link>
    </div>
  );
}
