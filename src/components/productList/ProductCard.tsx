import "../../pages/ProductList/ProductList.scss"


interface ProductCardProps {
  product: any;
  onCartClick: (product: any) => void;
  isAdded: boolean;
}

function ProductCard({ product, onCartClick, isAdded }: ProductCardProps) {
  return (
    <div className="product-list-card">
      {product.isNewArrival && (
        <div className="new-arrival-badge">✓ New Arrival</div>
      )}

      <div className="product-list-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-list-info">
        <div className="product-brand">{product.brand}</div>
        <h3>{product.name}</h3>

        <button
          onClick={() => onCartClick(product)}
          className={isAdded ? "added" : "not-added"}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
