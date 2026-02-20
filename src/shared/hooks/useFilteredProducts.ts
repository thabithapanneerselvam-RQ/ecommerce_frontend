import { useMemo } from "react";
import { products } from "../../data/Products";

export const useFilteredProducts = (
  searchQuery: string,
  priceRange: [number, number],
  selectedColors: string[],
  sortBy: string
) => {
  return useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.color.some((c) => selectedColors.includes(c))
      );
    }

    switch (sortBy) {
      case "Price: Low to High": result.sort((a, b) => a.price - b.price); break;
      case "Price: High to Low": result.sort((a, b) => b.price - a.price); break;
      case "Newest": result.sort((a, b) => b.id - a.id); break;
      default: result.sort((a, b) => a.id - b.id); break;
    }

    return result;
  }, [searchQuery, priceRange, selectedColors, sortBy]);
};