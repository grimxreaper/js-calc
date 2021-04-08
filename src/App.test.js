import { render, screen, cleanup } from '@testing-library/react';
import App from './App';
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

