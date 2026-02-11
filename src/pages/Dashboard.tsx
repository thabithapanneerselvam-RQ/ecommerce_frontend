import { useState } from "react";
import "../styles/Dashboard.scss";
import FlashSale from "../components/FlashSale";
import ProductList from "../components/ProductList";
import { useAppSelector, useAppDispatch } from "../hooks/useStore";
import { setSearch } from "../app/slice";
import axios from "axios";
import { type CategoryProduct } from "../data/Products";
import useDebounce from "../hooks/useDebounce";
import SearchInput from "../components/common/SearchInput";
import CategoryList from "../components/category/CategoryList";
import SalesReport from "../components/report/SalesReport";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";


const fetchCategories = async (): Promise<CategoryProduct[]> => {
  const res = await axios.get("https://api.escuelajs.co/api/v1/categories");

  if (res.status !== 200) {
    throw new Error("API failed");
  }
  
  return res.data.slice(0, 5).map((item: any) => ({
    id: item.id,
    name: item.name,
    image: item.image,
  }));
};


function Dashboard() {
  const navigate = useNavigate();

  const [likeCount, setLikeCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const { data: category = [], isLoading: loading, isError: error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (error) {
    return <p>Failed to load categories</p>;
  }

  const [showReport, setShowReport] = useState(false);

  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.product.search)
  
  const debounceSearch = useDebounce(search, 500);

  const handleLike = (count: number) => {
    setLikeCount(count);
  };

  const handleCart = (count: number) => {
    setCartCount(count);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-top">
          <div className="logo">
            <img src="/src/assets/logo.svg" alt="GoMart" />
            <h2>GoShop</h2>
          </div>

          <div className="search-btn">
            <img src="/src/assets/searchIcon.svg" alt="cart" />
            <SearchInput
              placeholder="Search products..."
              value={search}
              onChange={(value) => dispatch(setSearch(value))}
            />
          </div>

          <div className="right-nav">
            <div className="cart-icon" onClick={() => navigate("/cart")}>
              <img src="/src/assets/shopIcon.svg" alt="cart" />
               <span>{cartCount}</span>
            </div>

            <div className="like-icon">
              <img src="/src/assets/likeIcon.png" alt="like" />
              <span>{likeCount}</span>
            </div>

            <div className="profile">
              <img
                src="/src/assets/profileIcon.png"
                alt="profile"
                className="profile-avatar"
              />

              <div className="profile-text">
                <span className="welcome">Welcome Back!</span>
                <span className="name">Thabitha</span>
              </div>

              <span className="arrow">▾</span>
            </div>

            <div className="report-btn">
              <button onClick={() => setShowReport(true)}>See Report</button>
            </div>
          </div>
        </div>

      
        <div className="dashboard-hero">
          <div className="hero-content">
            <h1>
              <span className="line-1">Simple</span>
              <span className="line-2">is More</span>
            </h1>
          </div>
        </div>
      </div>

      <CategoryList
        categories={category}
        loading={loading}
        onCategoryClick={(id) => console.log("Category clicked:", id)}
      />


      {showReport ? (
        <div className="sales-report">
          <SalesReport onBack={() => setShowReport(false)}/>
        </div>
      ) : (
        <>
        <FlashSale onLikeChange={handleLike} />
        <ProductList searchQuery={debounceSearch} onCartChange={handleCart}/>
        </>
      )}


    </div>
  );
}

export default Dashboard;
