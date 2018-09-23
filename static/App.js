'use strict';

var contentNode = document.getElementById('contents');
var continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
var message = continents.map(function (c) {
  return 'Hello ' + c;
}).join(' ');
// var component = <h1 className="green">Hello World!</h1>; // simple JSX cmp
var component = React.createElement(
  'p',
  null,
  message
);
ReactDOM.render(component, contentNode);