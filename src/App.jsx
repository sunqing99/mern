import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router, Route, Switch, Redirect, withRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import IssueList from './IssueList';
import IssueEdit from './IssueEdit';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found (App.jsx)</p>;

const App = ({ children }) => {
  console.log('Children:', JSON.stringify(children, null, 2));
  return (
    <div>
      <div className="header">
        <h1>Issue Tracker</h1>
      </div>
      <div className="contents">
        {children}
      </div>
      <div className="footer">
        Full source code available at this <a href="https://github.com/sunqing99/mern/tree/chap8">GitHub repository</a>
      </div>
    </div>
  )
};

App.propTypes = {
  children: PropTypes.objectOf(React.component).isRequired,
};

const RoutedApp = () => (
  <Router>

    <Route exact path="/" component={App}>
      <Switch>
        <Redirect exact from="/" to="/issues" />
        <Route exact path="/issues" component={withRouter(IssueList)} />
        <Route path="/issues/:id" component={IssueEdit} />
        <Route component={NoMatch} />
      </Switch>
    </Route>

  </Router>
);

ReactDOM.render(<RoutedApp />, contentNode);

if (module.hot) {
  module.hot.accept();
}
