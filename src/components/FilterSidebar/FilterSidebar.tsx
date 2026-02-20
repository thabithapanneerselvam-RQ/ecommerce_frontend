import { useState } from "react";
import PriceFilter from "./PriceFilter";
import ColorFilter from "./ColorFilter";

interface Props {
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  selectedColors: string[];
  onColorToggle: (hex: string) => void;
}

function FilterSidebar({ priceRange, onPriceChange, selectedColors, onColorToggle }: Props) {
  const [expanded, setExpanded] = useState({ price: false, color: false });

  const toggle = (key: keyof typeof expanded) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="filter-sidebar">
      <div className="filter-header">
        <h3>Filter</h3>
        <button className="advanced-btn">Advanced</button>
      </div>
      <PriceFilter
        expanded={expanded.price}
        onToggle={() => toggle("price")}
        priceRange={priceRange}
        onChange={onPriceChange}
      />
      <ColorFilter
        expanded={expanded.color}
        onToggle={() => toggle("color")}
        selectedColors={selectedColors}
        onToggleColor={onColorToggle}
      />
    </div>
  );
}

export default FilterSidebar;