import axios from "axios";
import type { Product } from "../models/Product.model";

const BASE_URL = "https://fakestoreapi.com/products";

export const getProduct = async (): Promise<Product[]> => {
    const response = await axios.get(BASE_URL);
    return response.data;
}

export const updateProduct = async(id: number, data: Partial<Product>): Promise<Product> => {
    const response = await axios.put(`${BASE_URL}/${id}`, data);
    return response.data;
}

export const deleteProduct = async(id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
}