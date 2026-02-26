export interface Product {
  id: number;
  title?: string;
  description?: string;
  price: number;
  category?: string;
  image: string;
  brand: string;
  name: string;
  stock: number;
  isNewArrival: boolean;
  color: string[];
}