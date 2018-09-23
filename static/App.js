'use strict';

var contentNode = document.getElementById('contents');
var continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
var message = 'Hello ' + continents.find(function (c) {
  return c === 'Asia';
});
// var component = <h1 className="green">Hello World!</h1>; // simple JSX cmp
var component = React.createElement(
  'p',
  null,
  message
);
ReactDOM.render(component, contentNode);