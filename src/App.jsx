const contentNode = document.getElementById('contents');
const continents = ['Africa','America','Asia','Australia','Europe'];
const message = `Hello ${continents.find(c => c === 'Asia')}`
// var component = <h1 className="green">Hello World!</h1>; // simple JSX cmp
const component = <p>{message}</p>;
ReactDOM.render(component, contentNode);