import { useState, useEffect } from "react";
import "../styles/Dashboard.css";
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
import Card from "../components/common/Card";

function Dashboard() {
  const [likeCount, setLikeCount] = useState(0);
  const [category, setCategory] = useState<CategoryProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const [showReport, setShowReport] = useState(false);

  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.product.search)
  
  const debounceSearch = useDebounce(search, 500);

  const handleLike = (count: number) => {
    setLikeCount(count);
  };


   useEffect(() => {
      const fetchCategory = async () => {
        setLoading(true);
        try{
          const res = await axios.get("https://api.escuelajs.co/api/v1/categories");
          const data = await res.data;
  
          const mappedProducts: CategoryProduct[] = data.slice(0, 5).map((item: any) => ({
            id: item.id,
            name: item.name,
            image:item.image
          }))
          setCategory(mappedProducts)
        }catch(error){
          console.error("Failed to fetch category", error);
        }finally{
          setLoading(false);
        }
      }
      fetchCategory();
    }, [])

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
            <div className="cart-icon">
              <img src="/src/assets/shopIcon.svg" alt="cart" />
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
        <ProductList searchQuery={debounceSearch} />
        </>
      )}


    </div>
  );
}

export default Dashboard;
