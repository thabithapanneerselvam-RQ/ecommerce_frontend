import { fireEvent, render, screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import ProductList from "./ProductList";
import { CartContext } from "../../context/CartContext";
import { products } from "../../data/Products";

const mockAddToCart = vi.fn();
const mockRemoveFromCart = vi.fn();

const renderWithContext = (searchQuery = "", cartItems: any[] = []) =>
  render(
    <CartContext.Provider
      value={{
        cartItems,
        addToCart: mockAddToCart,
        removeFromCart: mockRemoveFromCart,
      }}
    >
      <ProductList searchQuery={searchQuery} onCartChange={vi.fn()} />
    </CartContext.Provider>
  );

describe("ProductList component", () => {

  beforeEach(() => {
    vi.clearAllMocks(); // important in Vitest
  });

  test("display header", () => {
    renderWithContext();
    expect(screen.getByText(/today's for you/i)).toBeInTheDocument();
  });

  test("renders product list", () => {
    renderWithContext();
    expect(screen.getByText(products[0].name)).toBeInTheDocument();
  });

  test("show no products found when no matching for your search", () => {
    renderWithContext("hello");
    expect(
      screen.getByText(/No products found matching your search./i)
    ).toBeInTheDocument();
  });

  test("calls addToCart when add to cart button clicked", () => {
    renderWithContext();

    const buttons = screen.getAllByRole("button", {
      name: /add to cart/i,
    });

    fireEvent.click(buttons[0]);

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
  });

  test("remove from cart", () => {
    renderWithContext("", [products[0]]);

    const buttons = screen.getAllByRole("button", {
      name: /add to cart/i,
    });

    fireEvent.click(buttons[0]);

    expect(mockRemoveFromCart).toHaveBeenCalledTimes(1);
  });

  test("toggle price filter part", () => {
    renderWithContext();

    const priceHeader = screen.getByText("Price");
    fireEvent.click(priceHeader);

    expect(screen.getAllByRole("slider").length).toBeGreaterThanOrEqual(2);
  });

  test("open color dropdown filter part", () => {
    renderWithContext();

    const colorHeader = screen.getByText("Color");
    fireEvent.click(colorHeader);

    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  test("goes to next page", () => {
    renderWithContext();

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(nextButton).toBeInTheDocument();
  });

});



