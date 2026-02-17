import { useContext, useEffect, useState } from "react";
import { CartContext} from "../../context/CartContext";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import "./AddToCart.scss"

function AddToCart() {
    const [quantity, setQuantity] = useState(1);

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

    const incrementQuantity = () =>{
        setQuantity(prevQuantity => prevQuantity + 1);
    }

    const decrementQuantity = () => {
        if(quantity > 1){
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    }

    const handleConfirmOrder = () => {
        Modal.success({
            title: "Order Confirmed",
            content: "Your order is confirmed and shipment has started 🚚",
        });
    }

    useEffect(()=>{
        setQuantity(0)
    },[])

    return (
        <div className="add-to-cart-container">
        <h1>Products in Cart</h1>

        {cartItems.map((product) => (
            <div key={product.id} className="cart-item">
            <img src={product.image} alt={product.name} width={100} />
            <div>
                <h3>{product.name}</h3>
                <p>Rs. {product.price}</p>
                <button onClick={decrementQuantity}>-</button>
                <input type="number" value={quantity}></input>
                <button onClick={incrementQuantity}>+</button>
                <br /><br />
                <button onClick={handleConfirmOrder}>Confirm order</button>
                <span>   </span>
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
