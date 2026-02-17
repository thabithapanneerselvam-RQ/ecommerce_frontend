import { BrowserRouter } from "react-router-dom"
import Login from "./Login"
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import * as authService from "../../services/authService";

jest.mock("../../services/authService");

const loginUser = jest.fn();

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useMutation: () => ({
    mutate: loginUser,
    
  }),
}));


const queryClient = new QueryClient();

afterEach(() => {
  jest.clearAllMocks();
});

describe("login component", () => {
    test("render login form", () => {
        render(
            <QueryClientProvider client={queryClient}>
            <BrowserRouter>
            <Login />
            </BrowserRouter>
            </QueryClientProvider>
        );

        expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    })

    test("validation errors when submitting empty forms", async() => {
        render(
            <QueryClientProvider client={queryClient}>
            <BrowserRouter>
            <Login />
            </BrowserRouter>
            </QueryClientProvider>
        );


        await userEvent.click(screen.getByRole("button", {name: /Login/i}));
        expect(await screen.findByText(/username is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
    })

    test("show text or password", async() => {
        render(
            <QueryClientProvider client={queryClient}>
            <BrowserRouter>
            <Login />
            </BrowserRouter>
            </QueryClientProvider>
        );

        const passwordInput = screen.getByPlaceholderText(/password/i);

        expect(passwordInput).toHaveAttribute("type", "password");

        const toggleButton = screen.getByTestId("toggle-password");

        await userEvent.click(toggleButton);

        expect(passwordInput).toHaveAttribute("type", "text");
    })

    test("successfull login", async() => {
        (authService.loginUser as jest.Mock).mockResolvedValue({token: "12345"});

        render(
            <QueryClientProvider client={queryClient}>
            <BrowserRouter>
            <Login />
            </BrowserRouter>
            </QueryClientProvider>
        );

        await userEvent.type(screen.getByPlaceholderText(/Username/i), "admin");
        await userEvent.type(screen.getByPlaceholderText(/Password/i), "1234");

        await userEvent.click(screen.getByRole("button", {name: /login/i}))

        expect(loginUser).toHaveBeenCalledWith({
            username: "admin",
            password: "1234"
        })
    })
    
})