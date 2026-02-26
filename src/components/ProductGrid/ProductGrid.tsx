import type { Product } from "../../models/Product.model";
import ProductCard from "./ProductCard";

interface Props {
  products: any[];
  cartItems: any[];
  onCartClick: (product: any) => void;
  onEdit: (id: number, data: Partial<Product>) => void;
  onDelete: (id: number) => void;
}

function ProductGrid({ products, cartItems, onCartClick, onEdit, onDelete }: Props) {
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
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ProductGrid;