import "../../pages/Dashboard/Dashboard.scss";

type CategoryItemProps = {
  id: number;
  name: string;
  image: string;
  onClick: (id: number) => void;
};

function CategoryItem({ id, name, image, onClick }: CategoryItemProps) {
  return (
    <div className="category-item" onClick={() => onClick?.(id)}>
      <div className="category-icon">
        <img src={image} alt={name}></img>
      </div>
      <p>{name}</p>
    </div>
  );
}

export default CategoryItem;
