const contentNode = document.getElementById('contents');
const continents = ['Africa','America','Asia','Australia','Europe'];
const message = continents.map(c => `Hello ${c}`).join(' ');
// var component = <h1 className="green">Hello World!</h1>; // simple JSX cmp
const component = <p>{message}</p>;
ReactDOM.render(component, contentNode);