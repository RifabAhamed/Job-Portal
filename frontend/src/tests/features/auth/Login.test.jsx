import { describe, test, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test-utils.jsx";
import Login from "../../../features/auth/Login";

// 1. Mock useNavigate from react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// 2. Mock useAuth context
const mockLogin = vi.fn();
vi.mock("../../../context/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

describe("Login Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("shows error message if fields are empty", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login />);

    // Click login without typing anything
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(
      screen.getByText(/please fill in both email and password/i),
    ).toBeInTheDocument();
  });

  test("calls login and navigates on successful credentials", async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValueOnce(); // Simulate successful login

    renderWithProviders(<Login />);

    // Fill out the form
    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "password123");

    // Submit
    await user.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  test("displays error message on login failure", async () => {
    const user = userEvent.setup();
    mockLogin.mockRejectedValueOnce("Invalid Credentials");

    renderWithProviders(<Login />);

    await user.type(screen.getByLabelText(/email/i), "wrong@example.com");
    await user.type(screen.getByLabelText(/password/i), "wrongpass");
    await user.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  test("navigates to signup page when clicking signup button", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login />);

    await user.click(screen.getByRole("button", { name: /sign up/i }));

    expect(mockNavigate).toHaveBeenCalledWith("/signup");
  });
});
