import { useState, useEffect } from "react";
import "./ProductList.scss";
import { ITEMS_PER_PAGE } from "../../shared/constants/Products";
import Card from "../../shared/common/Card";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Pagination from "../../components/Pagination/Pagination";
import { useFilteredProducts } from "../../shared/hooks/useFilteredProducts";
import { useCartHandler } from "../../shared/hooks/useCartHandler";

interface Props {
  searchQuery: string;
  onCartChange: (count: number) => void;
}

function ProductList({ searchQuery, onCartChange }: Props) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Popular");
  const [currentPage, setCurrentPage] = useState(1);

  const { handleCartClick, cartItems } = useCartHandler(onCartChange);
  const filteredProducts = useFilteredProducts(searchQuery, priceRange, selectedColors, sortBy);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginated = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => { setCurrentPage(1); }, [searchQuery]);

  return (
    <Card title="Today's For You!!!">
      <div className="list-container">
        <div className="list-body">
          <FilterSidebar
            priceRange={priceRange}
            onPriceChange={(r) => { setPriceRange(r); setCurrentPage(1); }}
            selectedColors={selectedColors}
            onColorToggle={(hex) => {
              setSelectedColors((prev) =>
                prev.includes(hex) ? prev.filter((c) => c !== hex) : [...prev, hex]
              );
              setCurrentPage(1);
            }}
          />
          <div className="products-section">
            <ProductGrid
              products={paginated}
              cartItems={cartItems}
              onCartClick={handleCartClick}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ProductList;