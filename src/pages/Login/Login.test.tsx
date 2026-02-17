import { BrowserRouter } from "react-router-dom";
import Login from "./Login";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";

import * as authService from "../../services/authService";

jest.mock("../../services/authService");

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const renderComp = () => {
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </QueryClientProvider>,
  );
};

const queryClient = new QueryClient();

afterEach(() => {
  jest.clearAllMocks();
});

describe("login component", () => {
  test("render login form", () => {
    renderComp();

    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  test("validation errors when submitting empty forms", async () => {
    renderComp();

    await userEvent.click(screen.getByRole("button", { name: /Login/i }));
    expect(
      await screen.findByText(/username is required/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i),
    ).toBeInTheDocument();
  });

  test("show text or password", async () => {
    renderComp();

    const passwordInput = screen.getByPlaceholderText(/password/i);

    expect(passwordInput).toHaveAttribute("type", "password");

    const toggleButton = screen.getByTestId("toggle-password");

    await userEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "text");
  });

  test("successfull login", async () => {
    (authService.loginUser as jest.Mock).mockResolvedValue({
      token: "12345",
    });
    renderComp();

    await userEvent.type(screen.getByPlaceholderText(/Username/i), "admin");
    await userEvent.type(screen.getByPlaceholderText(/Password/i), "1234");

    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("12345");
    });
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  test("invalid credentials", async () => {
    (authService.loginUser as jest.Mock).mockRejectedValue(
      new Error("Invalid username or password"),
    );
    renderComp();

    await userEvent.type(screen.getByPlaceholderText(/Username/i), "admin");
    await userEvent.type(screen.getByPlaceholderText(/Password/i), "2345");

    userEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(authService.loginUser).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByTestId("error-id")).toBeInTheDocument();
    expect(
      await screen.findByText(/Invalid username or password/i),
    ).toBeInTheDocument();
  });
});
