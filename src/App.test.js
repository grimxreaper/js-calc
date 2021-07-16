import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import ResultComponent from "./Components/ResultComponent";

//snapshot
it("matches snapshot", () => {
  const { asFragment } = render(<App />);
  expect(asFragment(<App />)).toMatchSnapshot();
});

//Testing DOM elements
it("when no key has been pressed, the display should be empty", () => {
  const { getByTestId } = render(<ResultComponent />);
  expect(getByTestId("result")).toHaveTextContent("");
});

test("buttons pressed appear in display", () => {
  const { getByTestId } = render(<App />);

  fireEvent.click(getByTestId(9));
  fireEvent.click(getByTestId(8));
  fireEvent.click(getByTestId("-"));
  fireEvent.click(getByTestId(7));
  fireEvent.click(getByTestId("*"));
  fireEvent.click(getByTestId(6));
  fireEvent.click(getByTestId(5));
  fireEvent.click(getByTestId("+"));
  fireEvent.click(getByTestId(4));
  fireEvent.click(getByTestId("("));
  fireEvent.click(getByTestId(3));
  fireEvent.click(getByTestId(2));
  fireEvent.click(getByTestId("."));
  fireEvent.click(getByTestId(0));
  fireEvent.click(getByTestId(1));
  fireEvent.click(getByTestId("/"));
  fireEvent.click(getByTestId(6));
  fireEvent.click(getByTestId(")"));

  expect(getByTestId("result")).toHaveTextContent("98-7*65+4(32.01/6)");
});

//Testing user interaction
describe("when result is empty and an operator is pressed, then result defaults to zero and operator", () => {
  test("for division", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId("/"));

    expect(getByTestId("result")).toHaveTextContent("0/");
  });
  test("for division and returns correct answer", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId("/"));
    fireEvent.click(getByTestId("="));

    expect(getByTestId("result")).toHaveTextContent("0");
  });
  test("for multiplication", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId("*"));

    expect(getByTestId("result")).toHaveTextContent("0*");
  });
  test("for multiplication and returns correct answer", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId("*"));
    fireEvent.click(getByTestId("="));

    expect(getByTestId("result")).toHaveTextContent("0");
  });
});

describe("when equals is pressed", () => {
  test("pressing another key starts a new calculation", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(1));
    fireEvent.click(getByTestId("+"));
    fireEvent.click(getByTestId(2));
    fireEvent.click(getByTestId("="));
    fireEvent.click(getByTestId(7));

    expect(getByTestId("result")).toHaveTextContent("7");
  });

  test("pressing another key and an addition operator continues a new calculation", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(1));
    fireEvent.click(getByTestId("+"));
    fireEvent.click(getByTestId(2));
    fireEvent.click(getByTestId("="));
    fireEvent.click(getByTestId(7));
    fireEvent.click(getByTestId("+"));

    expect(getByTestId("result")).toHaveTextContent("7+");
  });

  xtest("multiple times, applies last calculation to each result", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(3));
    fireEvent.click(getByTestId("*"));
    fireEvent.click(getByTestId(7));
    fireEvent.click(getByTestId("="));
    fireEvent.click(getByTestId("="));

    expect(getByTestId("result")).toHaveTextContent("147");
  });

  xtest("five times, it repeats the right hand side of previous operation every time", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(3));
    fireEvent.click(getByTestId("*"));
    fireEvent.click(getByTestId(7));
    fireEvent.click(getByTestId("="));
    fireEvent.click(getByTestId("="));
    fireEvent.click(getByTestId("="));
    fireEvent.click(getByTestId("="));
    fireEvent.click(getByTestId("="));

    expect(getByTestId("result")).toHaveTextContent("50421");
  });

  describe("returns the correct result", () => {
    test("for division", () => {
      const { getByTestId } = render(<App />);

      fireEvent.click(getByTestId(9));
      fireEvent.click(getByTestId("/"));
      fireEvent.click(getByTestId(2));
      fireEvent.click(getByTestId("="));
      expect(getByTestId("result")).toHaveTextContent("4.5");
    });

    test("for multiplication", () => {
      const { getByTestId } = render(<App />);

      fireEvent.click(getByTestId(4));
      fireEvent.click(getByTestId("*"));
      fireEvent.click(getByTestId(8));
      fireEvent.click(getByTestId("="));
      expect(getByTestId("result")).toHaveTextContent("32");
    });

    test("for addition", () => {
      const { getByTestId } = render(<App />);

      fireEvent.click(getByTestId(1));
      fireEvent.click(getByTestId("+"));
      fireEvent.click(getByTestId(8));
      fireEvent.click(getByTestId(9));
      fireEvent.click(getByTestId("="));
      expect(getByTestId("result")).toHaveTextContent("90");
    });

    test("for subtraction", () => {
      const { getByTestId } = render(<App />);

      fireEvent.click(getByTestId(1));
      fireEvent.click(getByTestId("-"));
      fireEvent.click(getByTestId(8));
      fireEvent.click(getByTestId("="));
      expect(getByTestId("result")).toHaveTextContent("-7");
    });
  });
});

test("when the key AC is pressed, the display is cleared", () => {
  const { getByTestId } = render(<App />);

  fireEvent.click(getByTestId(2));
  fireEvent.click(getByTestId("-"));
  fireEvent.click(getByTestId(3));
  fireEvent.click(getByTestId("AC"));

  expect(getByTestId("result")).toHaveTextContent("");
});

test("when the key CE is pressed, the last entered key in display is cleared", () => {
  const { getByTestId } = render(<App />);

  fireEvent.click(getByTestId(2));
  fireEvent.click(getByTestId("CE"));

  expect(getByTestId("result")).toHaveTextContent("");
});

describe("given the operation of 3 or more numbers", () => {
  test("when there is a multiplication operator, it returns the correct result", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(3));
    fireEvent.click(getByTestId("*"));
    fireEvent.click(getByTestId(7));
    fireEvent.click(getByTestId("*"));
    fireEvent.click(getByTestId(5));
    fireEvent.click(getByTestId("="));

    expect(getByTestId("result")).toHaveTextContent("105");
  });

  test("when there is a division and multiplication it returns the correct result", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(9));
    fireEvent.click(getByTestId(9));
    fireEvent.click(getByTestId("/"));
    fireEvent.click(getByTestId(3));
    fireEvent.click(getByTestId("*"));
    fireEvent.click(getByTestId(5));
    fireEvent.click(getByTestId("="));

    expect(getByTestId("result")).toHaveTextContent("165");
  });

  test("when there is a multiplication and addition with parens it returns the correct result", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId("("));
    fireEvent.click(getByTestId(7));
    fireEvent.click(getByTestId("+"));
    fireEvent.click(getByTestId(2));
    fireEvent.click(getByTestId(")"));
    fireEvent.click(getByTestId("*"));
    fireEvent.click(getByTestId(2));
    fireEvent.click(getByTestId("="));

    expect(getByTestId("result")).toHaveTextContent("18");
  });

  test("when there is a multiplication and addition without parens it returns the correct result", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(7));
    fireEvent.click(getByTestId("+"));
    fireEvent.click(getByTestId(2));
    fireEvent.click(getByTestId("*"));
    fireEvent.click(getByTestId(2));
    fireEvent.click(getByTestId("="));

    expect(getByTestId("result")).toHaveTextContent("11");
  });

  test("when there is an addition of decimal numbers it returns the correct result", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(1));
    fireEvent.click(getByTestId("."));
    fireEvent.click(getByTestId(1));
    fireEvent.click(getByTestId("+"));
    fireEvent.click(getByTestId(1));
    fireEvent.click(getByTestId("."));
    fireEvent.click(getByTestId(2));
    fireEvent.click(getByTestId("="));

    expect(getByTestId("result")).toHaveTextContent("2.3");
  });

  test("when there are multiple operations including parens it returns the correct result", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(8));
    fireEvent.click(getByTestId("."));
    fireEvent.click(getByTestId(7));
    fireEvent.click(getByTestId("*"));
    fireEvent.click(getByTestId(2));
    fireEvent.click(getByTestId("+"));
    fireEvent.click(getByTestId(6));
    fireEvent.click(getByTestId("-"));
    fireEvent.click(getByTestId("("));
    fireEvent.click(getByTestId(7));
    fireEvent.click(getByTestId("-"));
    fireEvent.click(getByTestId(2));
    fireEvent.click(getByTestId(")"));
    fireEvent.click(getByTestId("="));

    expect(getByTestId("result")).toHaveTextContent("18.4");
  });
});

describe("given special cases, it removes characters appropriately", () => {
  test("for trailing operators", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(3));
    fireEvent.click(getByTestId("*"));
    fireEvent.click(getByTestId(7));
    fireEvent.click(getByTestId("+"));
    fireEvent.click(getByTestId("="));

    expect(getByTestId("result")).toHaveTextContent("21");
  });

  test("for if a minus is already present, then you cannot add another one", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(3));
    fireEvent.click(getByTestId("-"));
    fireEvent.click(getByTestId("-"));

    expect(getByTestId("result")).toHaveTextContent("3-");
  });

  test("for more than one negative sign at the beginning of an expression", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId("-"));
    fireEvent.click(getByTestId("-"));

    expect(getByTestId("result")).toHaveTextContent("-");
  });

  test("for an addition followed by a multiplication operator, then it defaults to a multiplication operator", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(7));
    fireEvent.click(getByTestId("+"));
    fireEvent.click(getByTestId("*"));

    expect(getByTestId("result")).toHaveTextContent("7*");
  });

  test("for an addition followed by subtraction, then it defaults to a subtraction operator", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(7));
    fireEvent.click(getByTestId("+"));
    fireEvent.click(getByTestId("-"));
    fireEvent.click(getByTestId(7));
    fireEvent.click(getByTestId("="));

    expect(getByTestId("result")).toHaveTextContent("0");
  });

  xtest("for a subtraction followed by an addition, then it defaults to an addition", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(3));
    fireEvent.click(getByTestId("-"));
    fireEvent.click(getByTestId("+"));
    fireEvent.click(getByTestId(2));

    expect(getByTestId("result")).toHaveTextContent("3+2");
  });
});

describe("when operations are in parentheses", () => {
  test("and follow each other, then their results are multiplied together", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId("("));
    fireEvent.click(getByTestId(2));
    fireEvent.click(getByTestId("+"));
    fireEvent.click(getByTestId(2));
    fireEvent.click(getByTestId(")"));
    fireEvent.click(getByTestId("("));
    fireEvent.click(getByTestId(8));
    fireEvent.click(getByTestId("-"));
    fireEvent.click(getByTestId(2));
    fireEvent.click(getByTestId(")"));
    fireEvent.click(getByTestId("="));

    expect(getByTestId("result")).toHaveTextContent("24");
  });

  test("and a number is added in front of a parenthesis, then it is multiplied by what is inside the parenthesis", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(2));
    fireEvent.click(getByTestId("("));
    fireEvent.click(getByTestId(4));
    fireEvent.click(getByTestId("+"));
    fireEvent.click(getByTestId(4));
    fireEvent.click(getByTestId(")"));
    fireEvent.click(getByTestId("="));

    expect(getByTestId("result")).toHaveTextContent("16");
  });

  test("and their open parens aren't closed, then needed parentheses are added at the end of an operation", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId("("));
    fireEvent.click(getByTestId(1));
    fireEvent.click(getByTestId("+"));
    fireEvent.click(getByTestId(1));
    fireEvent.click(getByTestId("("));
    fireEvent.click(getByTestId(1));
    fireEvent.click(getByTestId("+"));
    fireEvent.click(getByTestId(2));
    fireEvent.click(getByTestId("("));
    fireEvent.click(getByTestId(1));
    fireEvent.click(getByTestId("+"));
    fireEvent.click(getByTestId(3));
    fireEvent.click(getByTestId("("));
    fireEvent.click(getByTestId(1));
    fireEvent.click(getByTestId("+"));
    fireEvent.click(getByTestId(4));
    fireEvent.click(getByTestId("("));
    fireEvent.click(getByTestId(1));
    fireEvent.click(getByTestId("+"));
    fireEvent.click(getByTestId(5));
    fireEvent.click(getByTestId("("));
    fireEvent.click(getByTestId(1));
    fireEvent.click(getByTestId("+"));
    fireEvent.click(getByTestId(6));
    fireEvent.click(getByTestId("="));

    expect(getByTestId("result")).toHaveTextContent("874");
  });
});
