import type { CategoryProduct } from "../../data/Products";
import CategoryItem from "./CategoryItem";
import Loader from "../../shared/common/Loader";
import "/home/thabitha/Documents/Frontend_training/ecommerce_FE_project/ecommerce/src/shared/styles/Dashboard.scss";

type CategoryListProps = {
  categories: CategoryProduct[];
  loading: boolean;
  onCategoryClick: (id: number) => void;
};

function CategoryList({categories, loading, onCategoryClick}: CategoryListProps) {
  if (loading) return <Loader />;

  return (
    <div className="category-section">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          id={category.id}
          name={category.name}
          image={category.image}
          onClick={onCategoryClick}
        />
      ))}
    </div>
  );
}

export default CategoryList;
