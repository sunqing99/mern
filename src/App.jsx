import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Route, Switch, Redirect, withRouter,
} from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import IssueList from './IssueList';
import IssueEdit from './IssueEdit';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found (App.jsx)</p>;

const Main = () => (
  <Switch>
    <Redirect exact from="/" to="/issues" />
    <Route exact path="/issues" component={withRouter(IssueList)} />
    <Route path="/issues/:id" component={IssueEdit} />
    <Route component={NoMatch} />
  </Switch>
);

const App = () => (
  <div className="container-fluid">
    <div className="header">
      <h1>Issue Tracker</h1>
    </div>
    <Main />
    <div className="footer">
      Full source code available at this <a href="https://github.com/sunqing99/mern/tree/chap9">GitHub repository</a>
    </div>
  </div>
);

const RoutedApp = () => (
  <Router>
    <App />
  </Router>
);

ReactDOM.render(<RoutedApp />, contentNode);

if (module.hot) {
  module.hot.accept();
}
