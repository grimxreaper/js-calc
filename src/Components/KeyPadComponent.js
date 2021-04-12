import React from "react";

const keypads = [
  { type: "operation", key: "(" },
  { type: "operation", key: "CE" },
  { type: "operation", key: ")" },
  { type: "operation", key: "AC" },
  { type: "operation", key: "/" },
  { type: "operation", key: "*" },
  { type: "operation", key: "-" },
  { type: "operation", key: "+" },
  { type: "key", key: 9 },
  { type: "key", key: 8 },
  { type: "key", key: 7 },
  { type: "key", key: 6 },
  { type: "key", key: 5 },
  { type: "key", key: 4 },
  { type: "key", key: 3 },
  { type: "key", key: 2 },
  { type: "key", key: 1 },
  { type: "key", key: 0 },
  { type: "operation", key: "=" },
  { type: "operation", key: "." },
];

class KeyPadComponent extends React.Component {
  render() {
    return (
      <div className="button">
        {keypads.map((keypad) => {
          return (
            <button
              className="keypad"
              key={keypad.key}
              name={keypad.key}
              data-testid={keypad.key}
              onClick={(e) => this.props.onClick(keypad)}
            >
              {keypad.key}
            </button>
          );
        })}

        {/* <button className="keypad" name="(" onClick={e => this.props.onClick(e.target.name)}>(</button>
                <button className="keypad" name="CE" onClick={e => this.props.onClick(e.target.name)}>CE</button>
                <button name=")" onClick={e => this.props.onClick(e.target.name)}>)</button>
                <button  name="AC" onClick={e => this.props.onClick(e.target.name)}>AC</button><br/>


                <button name="1" onClick={e => this.props.onClick(e.target.name)}>1</button>
                <button name="2" onClick={e => this.props.onClick(e.target.name)}>2</button>
                <button name="3" onClick={e => this.props.onClick(e.target.name)}>3</button>
                <button name="+" onClick={e => this.props.onClick(e.target.name)}>+</button><br/>


                <button name="4" onClick={e => this.props.onClick(e.target.name)}>4</button>
                <button name="5" onClick={e => this.props.onClick(e.target.name)}>5</button>
                <button name="6" onClick={e => this.props.onClick(e.target.name)}>6</button>
                <button name="-" onClick={e => this.props.onClick(e.target.name)}>-</button><br/>

                <button name="7" onClick={e => this.props.onClick(e.target.name)}>7</button>
                <button name="8" onClick={e => this.props.onClick(e.target.name)}>8</button>
                <button name="9" onClick={e => this.props.onClick(e.target.name)}>9</button>
                <button name="*" onClick={e => this.props.onClick(e.target.name)}>x</button><br/>


                <button name="." onClick={e => this.props.onClick(e.target.name)}>.</button>
                <button name="0" onClick={e => this.props.onClick(e.target.name)}>0</button>
                <button name="=" onClick={e => this.props.onClick(e.target.name)}>=</button>
                <button name="/" onClick={e => this.props.onClick(e.target.name)}>÷</button><br/> */}
      </div>
    );
  }
}

export default KeyPadComponent;
