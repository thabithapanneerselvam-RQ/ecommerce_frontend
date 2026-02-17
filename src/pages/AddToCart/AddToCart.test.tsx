import { fireEvent, render, screen } from "@testing-library/react"
import AddToCart from "./AddToCart"
import { CartContext } from "../../context/CartContext"


describe("add to cart component", () => {
   test("show empty cart message", () => {
    render(
        <CartContext.Provider value={{
            cartItems: [],
            addToCart: jest.fn(),
            removeFromCart: jest.fn()
        }}>
            <AddToCart />
        </CartContext.Provider>  
)

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
   })

   test("product is added to cart", () => {
    render(
        <CartContext.Provider value={{
            cartItems: [
                {
                    id: 1,
                    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
                    name: "Shirt Soft Cotton",
                    price: 32000,
                    brand: "",
                    stock: 0,
                    isNewArrival: false,
                    color: []
                }
            ],
            addToCart: jest.fn(),
            removeFromCart: jest.fn()
        }}>
            <AddToCart />
        </CartContext.Provider>  
    )
    expect(screen.getByText(/shirt soft cotton/i)).toBeInTheDocument();
   })

   test("when remove and confirm button is clicked", async() => {
    const mockRemove = jest.fn();

    render(
        <CartContext.Provider value={{
            cartItems: [
                {
                    id: 1,
                    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
                    name: "Shirt Soft Cotton",
                    price: 32000,
                    brand: "",
                    stock: 0,
                    isNewArrival: false,
                    color: []
                }
            ],
            addToCart: jest.fn(),
            removeFromCart: mockRemove,
        }}>
            <AddToCart />
        </CartContext.Provider>  
    )
    fireEvent.click(screen.getByText(/confirm order/i));
    fireEvent.click(screen.getByText(/remove/i));
    expect(mockRemove).toHaveBeenCalledWith(1);
   })
})