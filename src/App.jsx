const contentNode = document.getElementById('contents');
const continents = ['Africa','America','Asia','Australia','Europe'];
// this one use Array.find() which requires polyfill for IE11
// const message = `Hello ${continents.find(c => c === 'Asia')}`; 
const message = continents.map(c => `Hello ${c}!`).join(' ');
// var component = <h1 className="green">Hello World!</h1>; // simple JSX cmp
const component = <p>{message}</p>;
ReactDOM.render(component, contentNode);