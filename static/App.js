'use strict';

var contentNode = document.getElementById('contents');
var continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
// this one use Array.find() which requires polyfill for IE11
// const message = `Hello ${continents.find(c => c === 'Asia')}`; 
var message = continents.map(function (c) {
  return 'Hello ' + c + '!';
}).join(' ');
// var component = <h1 className="green">Hello World!</h1>; // simple JSX cmp
var component = React.createElement(
  'p',
  null,
  message
);
ReactDOM.render(component, contentNode);