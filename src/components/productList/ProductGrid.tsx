import "../../pages/ProductList/ProductList.scss"


import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  color: string[];
  isNewArrival?: boolean;
}

interface ProductGridProps {
  products: Product[];
  cartItems: Product[];
  onCartClick: (product: Product) => void;
}

function ProductGrid({
  products,
  cartItems,
  onCartClick,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="no-products">
        No products found.
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => {
        const isAdded = cartItems.some(
          (item) => item.id === product.id
        );

        return (
          <ProductCard
            key={product.id}
            product={product}
            onCartClick={onCartClick}
            isAdded={isAdded}
          />
        );
      })}
    </div>
  );
}

export default ProductGrid;
