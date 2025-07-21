import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../Login';

describe('Login Component', () => {
  test('renders login form', () => {
    render(
      <Login
        username=""
        password=""
        error=''
        setUsername={jest.fn()}
        setPassword={jest.fn()}
        handleLogin={jest.fn()}
      />
    );

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
});
