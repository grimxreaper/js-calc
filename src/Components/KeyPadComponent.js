import React from "react";

const keypads = [
  { key: "AC" },
  { key: "CE" },
  { key: "=" },
  { isDisplayable: true, key: "(" },
  { isDisplayable: true, key: ")" },
  { isDisplayable: true, key: "/" },
  { isDisplayable: true, key: "*" },
  { isDisplayable: true, key: "-" },
  { isDisplayable: true, key: "+" },
  { isDisplayable: true, key: "." },
  { isDisplayable: true, key: 9 },
  { isDisplayable: true, key: 8 },
  { isDisplayable: true, key: 7 },
  { isDisplayable: true, key: 6 },
  { isDisplayable: true, key: 5 },
  { isDisplayable: true, key: 4 },
  { isDisplayable: true, key: 3 },
  { isDisplayable: true, key: 2 },
  { isDisplayable: true, key: 1 },
  { isDisplayable: true, key: 0 },
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
