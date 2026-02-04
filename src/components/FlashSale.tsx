import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/FlashSale.css";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  sold: number;
  total: number;
}

function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 17,
    seconds: 48,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const products: Product[] = [
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
      image: "https://images.unsplash.com/photo-1542272454315-7d53a2b8d6e9?w=400&h=400&fit=crop",
      sold: 6,
      total: 10,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number): string => {
    return String(time).padStart(2, "0");
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const handleNext = () => {
    const maxIndex = Math.max(0, products.length - 4);
    setCurrentIndex((prev) => (prev >= maxIndex ? prev : prev + 1));
  };

  const formatPrice = (price: number): string => {
    return `Rs${price.toLocaleString("id-ID")}`;
  };

  const getCardWidth = () => {
    return 25; 
  };

  return (
    <div className="flash-sale-container">
      <div className="flash-sale-header">

        <div className="flash-sale-title">
          <div className="flash-icon">⚡</div>
          <h2>Flash Sale</h2>
        </div>

        <div className="countdown">
          <span className="countdown-label">End in</span>
          <div className="countdown-time">
            <div className="time-box">{formatTime(timeLeft.hours)}</div>
            <span className="separator">:</span>
            <div className="time-box">{formatTime(timeLeft.minutes)}</div>
            <span className="separator">:</span>
            <div className="time-box">{formatTime(timeLeft.seconds)}</div>
          </div>
        </div>
        
        <div className="navigation-buttons">
          <button
            className="nav-btn"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="nav-btn"
            onClick={handleNext}
            disabled={currentIndex >= Math.max(0, products.length - 4)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="products-container">
        <div
          className="products-slider"
          style={{
            transform: `translateX(-${currentIndex * getCardWidth()}%)`,
          }}
        >
          {products.map((product) => (
            <div key={product.id} className="product-card">

              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <button className="wishlist-btn">♡</button>
              </div>
              
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                  <span className="current-price">
                    {formatPrice(product.price)}
                  </span>
                  <span className="original-price">
                    {formatPrice(product.originalPrice)}
                  </span>
                </div>
                
                <div className="product-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${(product.sold / product.total) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="progress-text">
                    {product.sold}/{product.total} Sold
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FlashSale;