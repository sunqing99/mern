import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import IssueList from './IssueList';
import IssueEdit from './IssueEdit';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found (App.jsx)</p>;

const RoutedApp = () => (
  <Router>
    <Switch>
      <Redirect exact from="/" to="/issues" />
      <Route exact path="/issues" component={IssueList} />
      <Route path="/issues/:id" component={IssueEdit} />
      <Route component={NoMatch} />
    </Switch>
  </Router>
);

ReactDOM.render(<RoutedApp />, contentNode);

if (module.hot) {
  module.hot.accept();
}
