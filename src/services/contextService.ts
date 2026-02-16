import { useState } from "react";
import type { products } from "../data/Products";


export type Product = typeof products[number];
 
 export type CartContextType = {
   cartItems: Product[];
   addToCart: (product: Product) => void;
   removeFromCart: (id: number) => void;
 };
 
export function cartLogic() {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        setCartItems((prev) => {
            const exists = prev.find((item) => item.id===product.id);
            return exists ? prev : [...prev, product]
        })
    }

    const removeFromCart = (id: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    }

    return {
        addToCart,
        removeFromCart,
        cartItems
    }
}
