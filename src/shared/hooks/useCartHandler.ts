import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export const useCartHandler = (onCartChange: (count: number) => void) => {
  const context = useContext(CartContext);
  if (!context) throw new Error("Must be inside CartContext");

  const { addToCart, removeFromCart, cartItems } = context;

  const handleCartClick = (product: any) => {
    const exists = cartItems.some((item) => item.id === product.id);
    exists ? removeFromCart(product.id) : addToCart(product);
    onCartChange(exists ? cartItems.length - 1 : cartItems.length + 1);
  };

  return { handleCartClick, cartItems };
};