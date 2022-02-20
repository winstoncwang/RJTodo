import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import Todo from './components/Todo'

afterEach(cleanup);

test('render App', () => {
  const { container } = render(<App />);
  expect(container.firstChild).toHaveClass('App');
});

test('login, username and password label should render', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Todo />
    </BrowserRouter>
  )
  expect(getByText(/Username/)).toBeVisible();
  expect(getByText(/Password/)).toBeVisible();
  expect(getByText(/Login/)).toBeVisible();
})

test('Login with wrong button should show invalid page', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Todo />
    </BrowserRouter>
  )
  userEvent.type(screen.getByRole('textbox'), 'st')
  fireEvent.click(screen.getByText(/Login/))
  expect(getByText(/Invalid Credentials/)).toBeVisible();
})

test('Login show welcome page', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Todo />
    </BrowserRouter>
  )
  fireEvent.click(screen.getByText(/Login/))
  expect(getByText(/Welcome to the page/i)).toBeVisible();
})