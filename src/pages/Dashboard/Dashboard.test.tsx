import { fireEvent, render, screen } from "@testing-library/react"
import Dashboard from "./Dashboard"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { MemoryRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { Store } from "../../app/Store"
import userEvent from "@testing-library/user-event"


jest.mock("@tanstack/react-query", () => ({
    ...jest.requireActual("@tanstack/react-query"),
    useQuery: jest.fn()
}))

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn()
}))

jest.mock("../ProductList/ProductList", () => {
    return ({onCartChange}: any) => {
        return (
        <button onClick={() => onCartChange(3)}>
            Product list
        </button>
        )
    }
});

jest.mock("../FlashSale/FlashSale", () => {
    return ({onLikeChange}: any) => {
        return (
        <button onClick={() => onLikeChange(5)}>
            FlashSale
        </button>
        )
    }
});

jest.mock("../../components/category/CategoryList");

jest.mock("../../components/report/SalesReport", () => {
    return ({seeReport}: any) => {
        return (
        <button onClick={() => seeReport()}>
            Monthly sales report
        </button>
        )
    }
});

const queryClient = new QueryClient();

describe("dashboard component", () => {
    test("top header contains shop name", () => {
        (useQuery as jest.Mock).mockReturnValue({
            data: [],
            isLoading: false,
            isError: false
        })

        render(
            <Provider store={Store}>
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                    <Dashboard />
                    </MemoryRouter>
                </QueryClientProvider>
            </Provider>
        )
        expect(screen.getByText(/goshop/i)).toBeInTheDocument();
    });

    test("error showing failed to load categories", () => {
        (useQuery as jest.Mock).mockReturnValue({
            data: [],
            isLoading: false,
            isError: true
        })

        render(
            <Provider store={Store}>
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                    <Dashboard />
                    </MemoryRouter>
                </QueryClientProvider>
            </Provider>  
        )
        expect(screen.getByText(/Failed to load categories/i)).toBeInTheDocument();
    });

    test("like count update from flashsale", () => {
        (useQuery as jest.Mock).mockReturnValue({
            data: [],
            isLoading: false,
            isError: false
        })

        render(
            <Provider store={Store}>
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <Dashboard />
                    </MemoryRouter>
                </QueryClientProvider>
            </Provider>  
        )
        fireEvent.click(screen.getByText(/flashsale/i))

        expect(screen.getByText("5")).toBeInTheDocument();
    })

    test("cart count update from productList", () => {
        (useQuery as jest.Mock).mockReturnValue({
            data: [],
            isLoading: false,
            isError: false
        })

        render(
            <Provider store={Store}>
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <Dashboard />
                    </MemoryRouter>
                </QueryClientProvider>
            </Provider>  
        )
        fireEvent.click(screen.getByText(/product list/i))

        expect(screen.getByText("3")).toBeInTheDocument();
    })

    test("shows sales report when clicking See Report", () => {
        (useQuery as jest.Mock).mockReturnValue({
            data: [],
            isLoading: false,
            isError: false,
        });
        render(
            <Provider store={Store}>
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <Dashboard />
                    </MemoryRouter>
                </QueryClientProvider>
            </Provider>  
        )

        fireEvent.click(screen.getByText(/see report/i));

        expect(screen.getByText(/monthly sales report/i)).toBeInTheDocument();
    });

    test("searchbox updates when user types", async() => {
        (useQuery as jest.Mock).mockReturnValue({
            data: [],
            isLoading: false,
            isError: false,
        });
        render(
            <Provider store={Store}>
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <Dashboard />
                    </MemoryRouter>
                </QueryClientProvider>
            </Provider>  
        )

        const inputField = screen.getByPlaceholderText(/search products/i);

        await userEvent.type(inputField, "zip up neck shirt");
        expect(inputField).toHaveValue("zip up neck shirt")

    })
    
})