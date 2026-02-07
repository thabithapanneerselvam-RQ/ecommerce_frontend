export interface FlashSaleProduct {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  sold: number;
  total: number;
}

export interface CategoryProduct {
  id: number;
  name: string;
  image: string;
}

export const flashsaleproducts: FlashSaleProduct[] = [
    {
      id: 1,
      name: "EliteShield Performance Men's Jackets",
      price: 255000,
      originalPrice: 324000,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
      sold: 5,
      total: 10,
    },
    {
      id: 2,
      name: "Gentlemen's Summer Gray Hat - Premium Blend",
      price: 99000,
      originalPrice: 168000,
      image: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=400&h=400&fit=crop",
      sold: 8,
      total: 10,
    },
    {
      id: 3,
      name: "OptiZoom Camera Shoulder Bag",
      price: 250000,
      originalPrice: 345000,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      sold: 5,
      total: 10,
    },
    {
      id: 4,
      name: "Cloudy Chic - Grey Peep Toe Heeled Sandals",
      price: 270000,
      originalPrice: 340000,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
      sold: 9,
      total: 10,
    },
    {
      id: 5,
      name: "Premium Leather Wallet",
      price: 150000,
      originalPrice: 250000,
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop",
      sold: 7,
      total: 10,
    },
    {
      id: 6,
      name: "Classic Denim Jeans",
      price: 180000,
      originalPrice: 280000,
      image: "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGplYW5zfGVufDB8fDB8fHww",
      sold: 6,
      total: 10,
    },
  ];


  export const colors = [
    { name: "Black", hex: "#000000" },
    { name: "Red", hex: "#FF4444" },
    { name: "Yellow", hex: "#FFC700" },
    { name: "Mint", hex: "#B4E7CE" },
    { name: "Light Blue", hex: "#A8D8EA" },
    { name: "Purple", hex: "#9D84B7" },
    { name: "Blue", hex: "#4A90E2" },
    { name: "Orange", hex: "#FF8C42" },
    { name: "Cyan", hex: "#7FDBFF" },
  ];

  export interface Product {
    id: number;
    brand: string;
    name: string;
    price: number;
    image: string;
    stock: number;
    isNewArrival: boolean;
    color: string[];
  }
  

  export const products: Product[] = [
    {
      id: 1,
      brand: "Uniqlo",
      name: "Shirt Soft Cotton",
      price: 32000,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
      stock: 15,
      isNewArrival: false,
      color: ["#F5F5DC", "#808080"],
    },
    {
      id: 2,
      brand: "Uniqlo",
      name: "Zip Up Neck Shirt",
      price: 90000,
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=500&fit=crop",
      stock: 12,
      isNewArrival: true,
      color: ["#9D84B7"],
    },
    {
      id: 3,
      brand: "Uniqlo",
      name: "Classic Long Sleeve",
      price: 41000,
      image: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=500&fit=crop",
      stock: 17,
      isNewArrival: true,
      color: ["#A8D8EA"],
    },
    {
      id: 4,
      brand: "Uniqlo",
      name: "Full Hand Shirt",
      price: 80000,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop",
      stock: 3,
      isNewArrival: true,
      color: ["#B4E7CE"],
    },
    {
      id: 5,
      brand: "Uniqlo",
      name: "Short Sleeve Shirt",
      price: 50000,
      image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=400&h=500&fit=crop",
      stock: 10,
      isNewArrival: false,
      color: ["#D3D3D3"],
    },
    {
      id: 6,
      brand: "Uniqlo",
      name: "Baby collar shirt",
      price: 50000,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
      stock: 7,
      isNewArrival: true,
      color: ["#B4E7CE"],
    },
    {
      id: 7,
      brand: "Uniqlo",
      name: "Bobby Style Shirt",
      price: 67000,
      image: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=500&fit=crop",
      stock: 6,
      isNewArrival: true,
      color: ["#FF4444"],
    },
    {
      id: 8,
      brand: "Uniqlo",
      name: "Soft Shirt",
      price: 6000,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
      stock: 1,
      isNewArrival: true,
      color: ["#F5F5DC"],
    },
    {
      id: 9,
      brand: "Uniqlo",
      name: "Girly Shirt",
      price: 9000,
      image: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=500&fit=crop",
      stock: 10,
      isNewArrival: true,
      color: ["#FFC700"],
    },
    {
      id: 10,
      brand: "Uniqlo",
      name: "Shirt Soft Cotton",
      price: 7000,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
      stock: 9,
      isNewArrival: true,
      color: ["#4A90E2"],
    },
  ];


  