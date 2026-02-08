import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/FlashSale.css";
import "./ProductList";
import { type FlashSaleProduct } from "../data/Products";
import axios from "axios";
import Loader from "./common/Loader";

interface FlashSaleProps {
  onLikeChange: (count: number) => void;
}

function FlashSale({ onLikeChange }: FlashSaleProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 10,
    seconds: 59,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());

  const [products, setProducts] = useState<FlashSaleProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        const data = await res.data;

        const mappedProducts: FlashSaleProduct[] = data.map((item: any) => ({
          id: item.id,
          name: item.title,
          price: item.price * 1000, 
          originalPrice: item.price * 1200,
          image: item.image,
          sold: Math.floor(Math.random() * 10) + 1,
          total: 10,
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { hours, minutes, seconds } = prevTime;

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

  const formatTime = (time: number) => {
    return String(time).padStart(2, "0");
  };

  const formatPrice = (price: number): string => {
    return `Rs${price.toFixed(2)}`;
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const handleNext = () => {
    const maxIndex = Math.max(0, products.length - 4);
    setCurrentIndex((prev) => (prev >= maxIndex ? prev : prev + 1));
  };

  const getCardWidth = () => {
    return 25;
  };

  const handleLikeClick = (productId: number) => {
    setLikedProducts((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(productId)) {
        newLiked.delete(productId);
      } else {
        newLiked.add(productId);
      }
      onLikeChange(newLiked.size);
      return newLiked;
    });
  };

  return (
    <>
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
              disabled={
                currentIndex >= Math.max(0, products.length - 4)
              }
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="products-container">
           {loading ? (
            <Loader />
          ) : (
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
                  <button
                    className={`wishlist-btn ${
                      likedProducts.has(product.id) ? "liked" : ""
                    }`}
                    onClick={() => handleLikeClick(product.id)}
                  >
                    {likedProducts.has(product.id) ? "❤" : "♡"}
                  </button>
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
          )}
        </div>
      </div>
    </>
  );
}

export default FlashSale;
