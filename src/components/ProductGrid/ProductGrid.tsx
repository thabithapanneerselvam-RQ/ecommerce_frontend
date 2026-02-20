import ProductCard from "./ProductCard";

interface Props {
  products: any[];
  cartItems: any[];
  onCartClick: (product: any) => void;
}

function ProductGrid({ products, cartItems, onCartClick }: Props) {
  if (products.length === 0) {
    return <p>No products found matching your search.</p>;
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isInCart={cartItems.some((item) => item.id === product.id)}
          onCartClick={onCartClick}
        />
      ))}
    </div>
  );
}

export default ProductGrid;