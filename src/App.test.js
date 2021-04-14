import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import ResultComponent from "./Components/ResultComponent";
import { evaluate } from "mathjs";

//snapshot
it("matches snapshot", () => {
  const { asFragment } = render(<App />);
  expect(asFragment(<App />)).toMatchSnapshot();
});

//Testing DOM elements
it("should equal an empty string", () => {
  const { getByTestId } = render(<ResultComponent />);
  expect(getByTestId("result")).toHaveTextContent("");
});

//Testing user interaction
test("division button displays when clicked", () => {
  const { getByTestId } = render(<App />);

  fireEvent.click(getByTestId("/"));
  expect(getByTestId("result")).toHaveTextContent("/");
});

test("result displays correct number and operation when used together", () => {
  const { getByTestId } = render(<App />);

  fireEvent.click(getByTestId(9));
  fireEvent.click(getByTestId("/"));

  expect(getByTestId("result")).toHaveTextContent("9/");
});

//'CE button deletes previous number or command'
// test('CE button displays when clicked', () => {
//   const { getByTestId } = render(<App />);
//   const children = 'CE'

//   fireEvent.click(getByTestId("CE"))

//   expect(getByTestId('result')).toHaveTextContent('/')

//   userEvent.click(screen.getByRole('button', {name: /CE/i }))
//   expect(screen.queryByText(children)).toBeInTheDocument();
// })

//Testing events
it("state is updated when a button is clicked", () => {
  const { getByTestId } = render(<App />);

  fireEvent.click(getByTestId("("));

  expect(getByTestId("result")).toHaveTextContent("(");
});

//Testing events: multiplication calculation with eval
const x = 8;
const y = 7;
const operation = "*";

test("displays correct result of multiplying 8 by 7", () => {
  expect(evaluate(`${x} ${operation} ${y}`)).toBe(56);
});

describe("check the operation of 2 numbers", () => {
  test("division of 9 by 2 must result in 4.5", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(9));
    fireEvent.click(getByTestId("/"));
    fireEvent.click(getByTestId(2));
    fireEvent.click(getByTestId("="));
    expect(getByTestId("result")).toHaveTextContent("4.5");
  });

  test("multiplication of 4 by 8 must result in 32", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(4));
    fireEvent.click(getByTestId("*"));
    fireEvent.click(getByTestId(8));
    fireEvent.click(getByTestId("="));
    expect(getByTestId("result")).toHaveTextContent("32");
  });

  test("addition of 1 by 89 must result in 90", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(1));
    fireEvent.click(getByTestId("+"));
    fireEvent.click(getByTestId(8));
    fireEvent.click(getByTestId(9));
    fireEvent.click(getByTestId("="));
    expect(getByTestId("result")).toHaveTextContent("90");
  });

  test("subtraction of 1 by 8 must result in -7", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(1));
    fireEvent.click(getByTestId("-"));
    fireEvent.click(getByTestId(8));
    fireEvent.click(getByTestId("="));
    expect(getByTestId("result")).toHaveTextContent("-7");
  });
});

describe("check operations of AC and CE", () => {
  test("clearing the display when hitting AC", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(2));
    fireEvent.click(getByTestId("-"));
    fireEvent.click(getByTestId(3));
    fireEvent.click(getByTestId("AC"));

    expect(getByTestId("result")).toHaveTextContent("");
  });

  test("clearing the last entered number when hitting CE", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(2));
    fireEvent.click(getByTestId("CE"));

    expect(getByTestId("result")).toHaveTextContent("");
  });
});

describe("check the operation of 3 numbers", () => {
  test("multiplying 3 by 7 by 5 must result in 105", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(3));
    fireEvent.click(getByTestId("*"));
    fireEvent.click(getByTestId(7));
    fireEvent.click(getByTestId("*"));
    fireEvent.click(getByTestId(5));
    fireEvent.click(getByTestId("="));

    expect(getByTestId("result")).toHaveTextContent("105")
  });

  test("dividing 99 by 3 and multiplying by 5 must result in 165", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(9));
    fireEvent.click(getByTestId(9));
    fireEvent.click(getByTestId("/"));
    fireEvent.click(getByTestId(3));
    fireEvent.click(getByTestId("*"));
    fireEvent.click(getByTestId(5));
    fireEvent.click(getByTestId("="));

    expect(getByTestId("result")).toHaveTextContent("165")
  });

  test("multiplication and addition with parens", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId("("));
    fireEvent.click(getByTestId(7));
    fireEvent.click(getByTestId("+"));
    fireEvent.click(getByTestId(2));
    fireEvent.click(getByTestId(")"));
    fireEvent.click(getByTestId("*"));
    fireEvent.click(getByTestId(2));
    fireEvent.click(getByTestId("="));

    expect(getByTestId("result")).toHaveTextContent("18")
  });

  test("multiplication and addition without parens", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(7));
    fireEvent.click(getByTestId("+"));
    fireEvent.click(getByTestId(2));
    fireEvent.click(getByTestId("*"));
    fireEvent.click(getByTestId(2));
    fireEvent.click(getByTestId("="));

    expect(getByTestId("result")).toHaveTextContent("11")
  });
});


describe('error message displaying at correct times', () => {
  test("multiplying 3 by 7 then adding 8 and hitting CE must equal error", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(3));
    fireEvent.click(getByTestId("*"));
    fireEvent.click(getByTestId(7));
    fireEvent.click(getByTestId("+"));
    fireEvent.click(getByTestId(8));
    fireEvent.click(getByTestId("CE"));
    fireEvent.click(getByTestId("="));

    expect(getByTestId("result")).toHaveTextContent("error")
  });
})



// test('equal button is called one time', () => {
//   const x = 3;
//   const y = 4;
//   const onSubmit = jest.fn();
//   render(<App onSubmit={"="} />);
//   const { getByTestId } = render(<App />);

//   userEvent.click(screen.getAllByRole('button', { name: /3/i }))

//   userEvent.click(screen.getAllByRole('button', { name: /4/i }))

//   userEvent.click(screen.getByRole('button', { name: /=/i }));
//   fireEvent.click(screen.getByTestId("="));

//   expect(getByTestId("=")).toHaveBeenCalledTimes(1);
//   expect(onSubmit).toHaveBeenCalledWith({
//     x,
//     y
//   });
// });

//const calculate = require('./App')
// test('displays correct result of multiplying 8 by 7', () => {
//   const { getByTestId } = render(<App />);

//   expect(calculate(`${x} ${operation} ${y}`)).toBe(56)
// })

// it('displays correct result of multiplying 8 by 7', () => {
//   const { getByTestId } = render(<App />);

//   fireEvent.click(getByTestId("8"), getByTestId("*"), getByTestId("7"), getByTestId("="))

//   expect(getByTestId("result")).toHaveTextContent("56")
// })

//Testing keyboard events
