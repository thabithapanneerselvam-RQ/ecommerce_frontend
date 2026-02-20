import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  expanded: boolean;
  onToggle: () => void;
  priceRange: [number, number];
  onChange: (range: [number, number]) => void;
}

function PriceFilter({ expanded, onToggle, priceRange, onChange }: Props) {
  return (
    <div className="filter-section">
      <div className="filter-section-header" onClick={onToggle}>
        <h4>Price</h4>
        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {expanded && (
        <div className="filter-section-content">
          <div className="price-range-slider">
            <div className="slider-container">
              <input type="range" min="0" max="500000"
                value={priceRange[0]}
                onChange={(e) => onChange([+e.target.value, priceRange[1]])}
                className="range-slider range-min"
              />
              <input type="range" min="0" max="500000"
                value={priceRange[1]}
                onChange={(e) => onChange([priceRange[0], +e.target.value])}
                className="range-slider range-max"
              />
            </div>
            <div className="price-labels">
              <span>Rs {priceRange[0].toLocaleString()}</span>
              <span>Rs {priceRange[1].toLocaleString()}</span>
            </div>
            <div className="price-inputs">
              <input type="number" value={priceRange[0]}
                onChange={(e) => onChange([+e.target.value, priceRange[1]])} />
              <input type="number" value={priceRange[1]}
                onChange={(e) => onChange([priceRange[0], +e.target.value])} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PriceFilter;