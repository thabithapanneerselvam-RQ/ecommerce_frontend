import axios from "axios";
import { type CategoryProduct } from "../data/Products";

export const fetchCategories = async (): Promise<CategoryProduct[]> => {
  const res = await axios.get("https://api.escuelajs.co/api/v1/categories");

  return res.data.slice(0, 5).map((item: any) => ({
    id: item.id,
    name: item.name,
    image: item.image,
  }));
};
