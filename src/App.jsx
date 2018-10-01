import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import IssueList from './IssueList';
import IssueEdit from './IssueEdit';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found (App.jsx)</p>;

const RoutedApp = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={IssueList} />
      <Route path="/issueEdit" component={IssueEdit} />
      <Route component={NoMatch} />
    </Switch>
  </Router>
);

ReactDOM.render(<RoutedApp />, contentNode);

if (module.hot) {
  module.hot.accept();
}
