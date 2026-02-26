import { useState, useEffect } from "react";
import { getProduct, deleteProduct, updateProduct } from "../../api/product.api";
import type { Product } from "../../models/Product.model";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProduct();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const edit = async (id: number, data: Partial<Product>) => {
    const updated = await updateProduct(id, data);

    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, ...updated } : p
      )
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