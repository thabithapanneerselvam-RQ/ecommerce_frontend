interface Props {
  product: any;
  isInCart: boolean;
  onCartClick: (product: any) => void;
}

function ProductCard({ product, isInCart, onCartClick }: Props) {
  return (
    <div className="product-list-card">
      {product.isNewArrival && <div className="new-arrival-badge">✓ New Arrival</div>}
      <div className="product-list-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-list-info">
        <div className="product-brand">{product.brand}</div>
        <h3 className="product-list-name">{product.name}</h3>
        <div className="product-list-price">
          <span className="price">Rs {product.price.toFixed(2)}</span>
          <span className="stock-info">{product.stock} items left!</span>
        </div>
        <div className="addToCart">
          <button
            onClick={() => onCartClick(product)}
            className={`addToCart-btn ${isInCart ? "added" : "not-added"}`}
          >
            {isInCart ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;