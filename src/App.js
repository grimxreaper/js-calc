import React from "react";
import "./index.css";

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const operations = ["/", "×", "-", "+", "="];

class App extends React.Component {
  state = {
    lastPressed: undefined,
    currentNumber: "0",
    prevNumber: undefined,
  };

  handleClick = (e) => {
    const { lastPressed, currentNumber, prevNumber } = this.state;
    const { innerText } = e.target; // we get the target which is the button, and the innerText gets what's inside the button!

    if (!Number.isNaN(Number(innerText))) {
      if (currentNumber === "0") {
        this.setState({
          currentNumber: innerText,
        });
      } else {
        this.setState({
          currentNumber: currentNumber + innerText,
        });
      }
    }
    switch(innerText) {
      case 'AC' : {
        this.setState({
          currentNumber : '0',
          prevNumber: undefined
        })
        break;
      }
      case '.' : {
        if (!currentNumber.includes('.'))
          this.setState({
            currentNumber: currentNumber + innerText
          })
          break;
      }
     


      }

      this.setState({
        lastPressed: innerText, //so we're always setting what was last pressed
      });
  }


  render() {
    const { currentNumber } = this.state;
    return (
      <div className="calculator">
        <div id="display" className="display">
          {currentNumber}
        </div>
        <div className="nums-container">
          <button className="big-h light-grey ac" onClick={this.handleClick}>
            AC
          </button>
          {nums.map((num) => {
            return (
              <button
                className={`dark-grey ${num === 0 && "big-h"}`}
                onClick={this.handleClick}
                key={num}
              >
                {num}
              </button>
            );
          })}
          <button className="light-grey" onClick={this.handleClick}>
            .
          </button>
        </div>
        <div className="operations-container">
          {operations.map((operation) => {
            return (
              <button
                className="orange"
                key={operation}
                onClick={this.handleClick}
              >
                {operation}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
