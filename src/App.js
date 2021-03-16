import React from "react";
import "./index.css";

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const operations = ["/", "*", "-", "+", "="];

const App = () => {
  return (
    <div className="calculator">
      <div id="display" className="display">
        125
        </div>
        <div className="nums-container">
        {nums.map((num) => {
            return (
              <button className={`dark-grey ${num == 0 && 'big-h'}`} key={num}>
                {num}
              </button>
            );
          })}
        </div>
        <div className="operations-container">
          {operations.map((operation) => {
            return (
              <button className="orange" key={operation}>
                {operation}
              </button>
            );
          })}
        </div>
      </div>

  );
};

{
  /* <button>1</button>
<button>2</button>
<button className="dark-grey">3</button>
<button className="light-grey">4</button>
<button>1</button>
<button>2</button>
<button>3</button>
<button>4</button>

<button className="orange">1</button>
<button className="orange">2</button>
<button className="orange">3</button>
<button>4</button>
<button>1</button>
<button>2</button>
<button>3</button>
<button>4</button>
<button>1</button>
<button className="big-v">2</button>
<button className="big-h">3</button>
<button>4</button> */
}

export default App;