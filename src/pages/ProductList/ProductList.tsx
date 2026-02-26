import { useState, useEffect } from "react";
import "./ProductList.scss";
import { ITEMS_PER_PAGE } from "../../shared/constants/Products";
import Card from "../../shared/common/Card";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Pagination from "../../components/Pagination/Pagination";
import { useFilteredProducts } from "../../shared/hooks/useFilteredProducts";
import { useCartHandler } from "../../shared/hooks/useCartHandler";
import { Drawer, Radio, Button, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { useProducts } from "../../shared/hooks/useProducts";
// import { products as initialProducts } from "../../data/Products";

interface Props {
  searchQuery: string;
  onCartChange: (count: number) => void;
}

function ProductList({ searchQuery, onCartChange }: Props) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>("Popular");
  const [currentPage, setCurrentPage] = useState(1);

  const [tempSort, setTempSort] = useState(sortBy);

  const { handleCartClick, cartItems } = useCartHandler(onCartChange);
  const { products, edit, remove } = useProducts();

  const filteredProducts = useFilteredProducts(
    products,
    searchQuery,
    priceRange,
    selectedColors,
    sortBy
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginated = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );


  useEffect(() => {
    if (isSortOpen) {
      setTempSort(sortBy);
    }
  }, [isSortOpen]);

  const handleApplySort = () => {
    setSortBy(tempSort);
    setCurrentPage(1);
    setIsSortOpen(false);
  };

  const handleResetSort = () => {
    setTempSort("Popular");
  };

  useEffect(() => { setCurrentPage(1); }, [searchQuery]);

  return (
    <Card title="Today's For You!!!">
      <Breadcrumb
        items={[
          { title: <Link to="/">Home</Link> },
          { title: <Link to="/dashboard">Dashboard</Link> },
          { title: "Contact" },
        ]}
      />
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

            <div className="products-header">
                <button
                  className="sort-btn"
                  onClick={() => setIsSortOpen(true)}
                >
                  ☰ Sort by: <strong>{sortBy}</strong>
                </button>
            </div>
                <Drawer
                  title="Sort Products"
                  placement="right"
                  onClose={() => setIsSortOpen(false)}
                  open={isSortOpen}
                >
                  <div className="sort-options">
                    
                    <Radio.Group
                      value={tempSort}
                      onChange={(e) => setTempSort(e.target.value)}
                    >
                      <Radio value="Popular">Popular</Radio>
                      <Radio value="Newest">Newest</Radio>
                      <Radio value="Price: Low to High">Price: Low to High</Radio>
                      <Radio value="Price: High to Low">Price: High to Low</Radio>
                    </Radio.Group>

                    <div className="sort-btn">
                      <Button onClick={handleResetSort}>
                        Reset
                      </Button>

                      <Button type="primary" onClick={handleApplySort}>
                        Apply
                      </Button>
                    </div>

                  </div>
                </Drawer>
              
            

            <ProductGrid
              products={paginated}
              cartItems={cartItems}
              onCartClick={handleCartClick}
              onEdit={edit}
              onDelete={remove}
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