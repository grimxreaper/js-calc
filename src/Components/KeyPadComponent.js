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
  { type: "key", key: "." },
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
      </div>
    );
  }
}

export default KeyPadComponent;
