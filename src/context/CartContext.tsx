import { createContext } from "react";
import { cartLogic, type CartContextType } from "../services/ContextService";

export const CartContext = createContext<CartContextType | null>(null);

export type CartProviderProps = {
    children: React.ReactNode
}

export const CartProvider = ({children}: CartProviderProps) => {
    const cartData = cartLogic();

    return(
        <CartContext.Provider value={cartData}>
            {children}
        </CartContext.Provider>
    )
}