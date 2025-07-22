import { render, screen } from "@testing-library/react";
import Login from "../Login";


describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form", () => {
    render(
      <Login
        username=""
        password=""
        error=""
        isLoading={false}
        setUsername={jest.fn()}
        setPassword={jest.fn()}
        handleLogin={jest.fn()}
      />,
    );
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("shows error on invalid credentials", async () => {
    render(
      <Login
        username=""
        password=""
        error="invalid credentials"
        isLoading={false}
        setUsername={jest.fn()}
        setPassword={jest.fn()}
        handleLogin={jest.fn()}
      />,
    );
    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });

  test("shows error on network failure", async () => {
    render(
      <Login
        username=""
        password=""
        error="Network error"
        isLoading={false}
        setUsername={jest.fn()}
        setPassword={jest.fn()}
        handleLogin={jest.fn()}
      />,
    );
    expect(screen.getByText(/network error/i)).toBeInTheDocument();
  });

  test("disables and enables login button based on isLoading", () => {
    const { rerender } = render(
      <Login
        username=""
        password=""
        error=""
        isLoading={true}
        setUsername={jest.fn()}
        setPassword={jest.fn()}
        handleLogin={jest.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: /login/i })).toBeDisabled();

    // Simulate loading finished
    rerender(
      <Login
        username=""
        password=""
        error=""
        isLoading={false}
        setUsername={jest.fn()}
        setPassword={jest.fn()}
        handleLogin={jest.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: /login/i })).not.toBeDisabled();
  });

  test("shows error when error prop is set", () => {
    render(
      <Login
        username=""
        password=""
        error="invalid credentials"
        isLoading={false}
        setUsername={jest.fn()}
        setPassword={jest.fn()}
        handleLogin={jest.fn()}
      />,
    );
    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });
});
