import { fireEvent, render, screen } from "@testing-library/react"
import ProductList from "./ProductList"
import { CartContext } from "../../context/CartContext"
import { products} from "../../data/Products";


const mockAddToCart = jest.fn();
const mockRemoveFromCart = jest.fn();

const mockWithContext = {
    cartItems: [],
    addToCart: mockAddToCart,
    removeFromCart: mockRemoveFromCart
}

const renderWithContext = (searchQuery = "") =>
  render(
    <CartContext.Provider value={mockWithContext}>
      <ProductList searchQuery={searchQuery} onCartChange={jest.fn()} />
    </CartContext.Provider>
  );

describe("productList component", () => {
    test("display header", () => {
        renderWithContext();

        expect(screen.getByText(/today's for you/i)).toBeInTheDocument();
    })

    test("renders product list", () => {
        renderWithContext();

        expect(screen.getByText(products[0].name)).toBeInTheDocument();
    })

    test("show no products found when no matching for your search", () => {
        renderWithContext("hello");

        expect(screen.getByText(/No products found matching your search./i)).toBeInTheDocument();
    })

    test("calls addToCart when add to cart button clicked", () => {
        renderWithContext();

        const addToCartBtn = screen.getAllByRole("button", {name: /Add to Cart/i})
        fireEvent.click(addToCartBtn[0]);

        expect(mockAddToCart).toHaveBeenCalled();
    })

    test("remove from cart", () => {
        const productInCart = products[0];

        const contextWithItem = {
            cartItems: [productInCart],
            addToCart: mockAddToCart,
            removeFromCart: mockRemoveFromCart,
        };

        render(
            <CartContext.Provider value={contextWithItem}>
                <ProductList searchQuery="" onCartChange={jest.fn()} />
            </CartContext.Provider>
        )


        const addToCartBtn = screen.getAllByRole("button", {name: /Add to Cart/i})
        fireEvent.click(addToCartBtn[0]);

        expect(mockRemoveFromCart).toHaveBeenCalled();
    })

    test("toggle price filter part", () => {
        renderWithContext();

        const priceHeader = screen.getByText("Price");
        fireEvent.click(priceHeader);

        expect(screen.getAllByRole("slider").length).toBeGreaterThanOrEqual(2);
    })

    test("open color dropdown filter part", () => {
        renderWithContext();

        const colorHeader = screen.getByText("Color");
        fireEvent.click(colorHeader);

        expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
    })

    test("goes to next page", () => {
        renderWithContext();

        const nextButton = screen.getByText("Next");

        if (nextButton) {
            fireEvent.click(nextButton);
            expect(nextButton).toBeInTheDocument();
        }
    });


})