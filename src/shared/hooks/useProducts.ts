import { useState } from "react";
import { deleteProduct, updateProduct } from "../../api/product.api";
import type { Product } from "../../models/Product.model";

export const useProducts = (initial: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initial);

  const edit = async (id: number, data: Partial<Product>) => {
    const updated = await updateProduct(id, data);

    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updated} : p))
    );
  };

  const remove = async (id: number) => {
    await deleteProduct(id);

    setProducts(prev =>
      prev.filter(p => p.id !== id)
    );
  };

  return { products, edit, remove };
};