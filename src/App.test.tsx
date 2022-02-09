import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
  // const userInput = screen.get('user');
  // console.log('*******', userInput);
  // userInput.click();

});

test('should render commit list', ()=>{
  let x  = render(<App />);

  console.log(screen.queryByTestId('user'))
  expect(screen.queryByTestId('user')).toBeInTheDocument()
})