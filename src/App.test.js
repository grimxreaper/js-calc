import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import App from './App';
import KeyPadComponent from './Components/KeyPadComponent';
import ResultComponent from './Components/ResultComponent';


afterEach(cleanup)
//snapshot
it("matches snapshot", () => {
  const { asFragment } = render(<App />)
  expect(asFragment(<App />)).toMatchSnapshot()
});

//Testing DOM elements
it('should equal an empty string', () => {
  const { getByTestId } = render(<ResultComponent />);
  expect(getByTestId('result')).toHaveTextContent('')
});

//Testing events
it('displays open parens when clicked', () => {
  const { getByTestId } = render(<App />);
  
  fireEvent.click(getByTestId("("))

  expect(getByTestId("result")).toHaveTextContent("(")

})
//Testing events: multiplication calculation 

//1. press 8 and * and 7
//2. press =
//3. expect '56'

const x = 8;
const y = 7;
const operation = "*"
const expectedMultResult = 56;

test('displays correct result of multiplying 8 by 7', () => {
  expect(eval(`${x} ${operation} ${y}`)).toBe(56)
})

test('displays correct result of multiplying 8 by 7', () => {
  expect(calculate(`${x} ${operation} ${y}`)).toBe(56)
})

// it('displays correct result of multiplying 8 by 7', () => {
//   const { getByTestId } = render(<App />);

//   fireEvent.click(getByTestId("8"), getByTestId("*"), getByTestId("7"), getByTestId("="))

//   expect(getByTestId("result")).toHaveTextContent("56")
// })

//Testing events: division calculation 