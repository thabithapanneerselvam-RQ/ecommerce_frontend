import { useState, useMemo, useEffect, useContext} from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import "../styles/ProductList.css";
import { colors, products } from "../data/Products";
import { ITEMS_PER_PAGE } from "../constants/Products";
import Card from "./common/Card";
import { CartContext } from "../context/CartContext";

interface ProductSearchProps {
  searchQuery: string;
}

interface AddToCartProps {
  onCartChange: (count: number) => void;
}

function ProductList({ searchQuery, onCartChange }: ProductSearchProps & AddToCartProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showSortDropdown, setShowSortDropdown] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("Popular");
  const [expandedSections, setExpandedSections] = useState({
    price: false,
    color: false,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  const context = useContext(CartContext);
  if(!context){
    throw new Error("product list should be inside context")
  }
  const { addToCart, removeFromCart, cartItems } = context;

  const handleCartClick = (product: any) => {
    const exists = cartItems.some((item) => item.id === product.id);

    if (exists) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }

    onCartChange(
      exists ? cartItems.length - 1 : cartItems.length + 1
    );
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1],
    );

    if (selectedColors.length > 0) {
      result = result.filter((product) =>
        product.color.some((c) => selectedColors.includes(c)),
      );
    }

    switch (sortBy) {
      case "Price: Low to High":
        result.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "Newest":
        result.sort((a, b) => b.id - a.id);
        break;
      case "Popular":
      default:
        result.sort((a, b) => a.id - b.id);
        break;
    }

    return result;
  }, [searchQuery, priceRange, selectedColors, sortBy]);

  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / ITEMS_PER_PAGE,
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredAndSortedProducts.slice(
    startIndex,
    endIndex,
  );

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
    setCurrentPage(1);
  };

  const handlePriceChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setShowSortDropdown(false);
    setCurrentPage(1);
  };

  const formatPrice = (price: number): string => {
    return `RS ${price.toFixed(2)}`;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <>
    <Card title="Today's For You!!!">
      <div className="list-container">

        <div className="list-body">
          <div className="filter-sidebar">
            <div className="filter-header">
              <h3>Filter</h3>
              <button className="advanced-btn">Advanced</button>
            </div>

            <div className="filter-section">
              <div
                className="filter-section-header"
                onClick={() => toggleSection("price")}
              >
                <h4>Price</h4>
                {expandedSections.price ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>

              {expandedSections.price && (
                <div className="filter-section-content">
                  <div className="price-range-slider">
                    <div className="slider-container">
                      <input
                        type="range"
                        min="0"
                        max="500000"
                        value={priceRange[0]}
                        onChange={(e) =>
                          handlePriceChange([+e.target.value, priceRange[1]])
                        }
                        className="range-slider range-min"
                      />
                      <input
                        type="range"
                        min="0"
                        max="500000"
                        value={priceRange[1]}
                        onChange={(e) =>
                          handlePriceChange([priceRange[0], +e.target.value])
                        }
                        className="range-slider range-max"
                      />
                      <div className="slider-track">
                        <div
                          className="slider-range"
                          style={{
                            left: `${(priceRange[0] / 500000) * 100}%`,
                            width: `${
                              ((priceRange[1] - priceRange[0]) / 500000) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="price-labels">
                      <span>Rs {priceRange[0].toLocaleString()}</span>
                      <span>Rs {priceRange[1].toLocaleString()}</span>
                    </div>

                    <div className="price-inputs">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) =>
                          handlePriceChange([+e.target.value, priceRange[1]])
                        }
                      />
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) =>
                          handlePriceChange([priceRange[0], +e.target.value])
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="filter-section">
              <div
                className="filter-section-header"
                onClick={() => toggleSection("color")}
              >
                <h4>Color</h4>
                {expandedSections.color ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>

              {expandedSections.color && (
                <div className="filter-section-content">
                  <div className="color-grid">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        className={`color-btn ${
                          selectedColors.includes(color.hex) ? "active" : ""
                        }`}
                        onClick={() => toggleColor(color.hex)}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColors.includes(color.hex) && (
                          <span className="color-check">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="products-section">
            <div className="products-header">
              <div className="sort-dropdown">
                <button
                  className="sort-btn"
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                >
                  ☰ Sort by: <strong>{sortBy}</strong>
                </button>
                {showSortDropdown && (
                  <div className="sort-options">
                    <div onClick={() => handleSortChange("Popular")}>
                      Popular
                    </div>
                    <div onClick={() => handleSortChange("Newest")}>Newest</div>
                    <div onClick={() => handleSortChange("Price: Low to High")}>
                      Price: Low to High
                    </div>
                    <div onClick={() => handleSortChange("Price: High to Low")}>
                      Price: High to Low
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="products-grid" key={currentPage}>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <div key={product.id} className="product-list-card">
                    {product.isNewArrival && (
                      <div className="new-arrival-badge">✓ New Arrival</div>
                    )}
                    <div className="product-list-image">
                      <img src={product.image} alt={product.name} />
                    </div>

                    <div className="product-list-info">
                      <div className="product-brand">{product.brand}</div>
                      <h3 className="product-list-name">{product.name}</h3>
                      <div className="product-list-price">
                        <span className="price">
                          {formatPrice(product.price)}
                        </span>
                        <span className="stock-info">
                          {product.stock} items left!
                        </span>
                      </div>

                      <div className="addToCart">
                        <button 
                        onClick={() => {handleCartClick(product)}} 
                        className={`addToCart-btn ${
                          cartItems.some((item)=> item.id === product.id) ? "added" : "not-added"
                        }`}>
                          Add to Cart
                        </button>
                       
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <p>
                    No products found matching your search.
                  </p>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={currentPage === index + 1 ? "active" : ""}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      </Card>
    </>
  );
}

export default ProductList;
