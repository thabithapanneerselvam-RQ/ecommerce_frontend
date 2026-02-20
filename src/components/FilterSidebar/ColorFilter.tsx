import { ChevronDown, ChevronUp } from "lucide-react";
import { colors } from "../../data/Products";

interface Props {
  expanded: boolean;
  onToggle: () => void;
  selectedColors: string[];
  onToggleColor: (hex: string) => void;
}

function ColorFilter({ expanded, onToggle, selectedColors, onToggleColor }: Props) {
  return (
    <div className="filter-section">
      <div className="filter-section-header" onClick={onToggle}>
        <h4>Color</h4>
        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {expanded && (
        <div className="filter-section-content">
          <div className="color-grid">
            {colors.map((color) => (
              <button
                key={color.name}
                className={`color-btn ${selectedColors.includes(color.hex) ? "active" : ""}`}
                onClick={() => onToggleColor(color.hex)}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {selectedColors.includes(color.hex) && <span className="color-check">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ColorFilter;