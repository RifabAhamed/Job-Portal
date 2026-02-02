import { describe, test, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test-utils";
import Signup from "../../../features/auth/Signup";
import AuthService from "../../../features/auth/AuthService";

// 1. Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

// 2. Mock AuthService
vi.mock("../../../features/auth/AuthService", () => ({
  default: {
    signup: vi.fn(),
  },
}));

describe("Signup Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders all input fields correctly", () => {
    renderWithProviders(<Signup />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/select role/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument(); // regex to distinguish from confirm
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i }),
    ).toBeInTheDocument();
  });

  test("shows error when passwords do not match", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Signup />);

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/^password/i), "password123");
    await user.type(screen.getByLabelText(/confirm password/i), "different123");

    // We must select a role for the validation logic to reach the password check
    const selectLabel = screen.getByLabelText(/select role/i);
    await user.click(selectLabel);
    const option = await screen.findByRole("option", { name: /job seeker/i });
    await user.click(option);

    await user.click(screen.getByRole("button", { name: /register/i }));

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  test("calls AuthService.signup and navigates on success", async () => {
    const user = userEvent.setup();
    AuthService.signup.mockResolvedValueOnce({ data: { success: true } });

    renderWithProviders(<Signup />);

    // Fill form
    await user.type(screen.getByLabelText(/name/i), "Jane Doe");
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");

    // Handle MUI Select
    await user.click(screen.getByLabelText(/select role/i));
    await user.click(await screen.findByRole("option", { name: /employer/i }));

    await user.type(screen.getByLabelText(/^password/i), "secure123");
    await user.type(screen.getByLabelText(/confirm password/i), "secure123");

    await user.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(AuthService.signup).toHaveBeenCalledWith({
        name: "Jane Doe",
        email: "jane@example.com",
        password: "secure123",
        role: "employer",
      });
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });
});