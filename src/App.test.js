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