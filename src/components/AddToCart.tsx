import { useContext } from "react";
import { CartContext} from "../context/CartContext";
import { ShoppingCartOutlined } from "@ant-design/icons";


function AddToCart() {
    const context = useContext(CartContext);
    if(!context){
        throw new Error("ProductList must be used within CartProvider")
    }
    const { cartItems, removeFromCart } = context;

    if (cartItems.length === 0) {
        return <h2> 
            Your cart is empty <span>  </span>
            <ShoppingCartOutlined style={{ fontSize: 25 }} />   
            </h2>;
    }

    return (
        <div className="add-to-cart-container">
        <h1>Products in Cart</h1>

        {cartItems.map((product) => (
            <div key={product.id} className="cart-item">
            <img src={product.image} alt={product.name} width={100} />
            <div>
                <h3>{product.name}</h3>
                <p>Rs. {product.price}</p>
                <button onClick={() => removeFromCart(product.id)}>
                Remove
                </button>
            </div>
            </div>
        ))}
        </div>
    );
}

export default AddToCart;
