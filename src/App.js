import ReactDOM from 'react-dom';
import React from 'react';
import './App.css';

const App = () => {
return(
  <div className="calculator">
    <button>1</button>
    <button>2</button>
    <button>3</button>
    <button>4</button>
  </div>
)
}


export default App;
ReactDOM.render(<App />, document.getElementById('app'));
