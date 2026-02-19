import { useState } from "react";
import "../../pages/ProductList/ProductList.scss"

interface FilterSidebarProps {
  priceRange: [number, number];
  setPriceRange: React.Dispatch<
    React.SetStateAction<[number, number]>
  >;
  selectedColors: string[];
  setSelectedColors: React.Dispatch<
    React.SetStateAction<string[]>
  >;
}

const availableColors = [
  "Black",
  "White",
  "Red",
  "Blue",
  "Green",
];

function FilterSidebar({
  priceRange,
  setPriceRange,
  selectedColors,
  setSelectedColors,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    color: true,
  });

  const toggleSection = (section: "price" | "color") => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color]
    );
  };

  return (
    <div className="filter-sidebar">
      <h3>Filters</h3>

      {/* PRICE FILTER */}
      <div className="filter-section">
        <div
          className="filter-header"
          onClick={() => toggleSection("price")}
        >
          <span>Price</span>
          <span>
            {expandedSections.price ? "−" : "+"}
          </span>
        </div>

        {expandedSections.price && (
          <div className="filter-content">
            <input
              type="range"
              min={0}
              max={500000}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([
                  0,
                  Number(e.target.value),
                ])
              }
            />
            <p>
              ₹{priceRange[0]} - ₹{priceRange[1]}
            </p>
          </div>
        )}
      </div>

      {/* COLOR FILTER */}
      <div className="filter-section">
        <div
          className="filter-header"
          onClick={() => toggleSection("color")}
        >
          <span>Color</span>
          <span>
            {expandedSections.color ? "−" : "+"}
          </span>
        </div>

        {expandedSections.color && (
          <div className="filter-content">
            {availableColors.map((color) => (
              <label key={color}>
                <input
                  type="checkbox"
                  checked={selectedColors.includes(
                    color
                  )}
                  onChange={() =>
                    handleColorChange(color)
                  }
                />
                {color}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterSidebar;
