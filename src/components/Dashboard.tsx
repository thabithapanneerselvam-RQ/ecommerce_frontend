
import "../styles/Dashboard.css";
import FlashSale from "./FlashSale";


function Dashboard() {


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
            <input type="text"></input>
          </div>

          <div className="right-nav">
            <div className="cart-icon">
              <img src="/src/assets/shopIcon.svg" alt="cart" />
            </div>

            <div className="like-icon">
              <img src="/src/assets/likeIcon.png" alt="like" />
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
              <button>See Report</button>
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
      
      <div className="category-section">
        <div className="category-item">
          <div className="category-icon">
            <img src="/src/assets/shopIcon.svg" alt="T-Shirt" />
          </div>
          <p>T-Shirt</p>
        </div>

        <div className="category-item">
          <div className="category-icon">
            <img src="/src/assets/shopIcon.svg" alt="Jacket" />
          </div>
          <p>Jacket</p>
        </div>

        <div className="category-item">
          <div className="category-icon">
            <img src="/src/assets/shopIcon.svg" alt="Shirt" />
          </div>
          <p>Shirt</p>
        </div>

        <div className="category-item">
          <div className="category-icon">
            <img src="/src/assets/shopIcon.svg" alt="Shoes" />
          </div>
          <p>Shoes</p>
        </div>

        <div className="category-item">
          <div className="category-icon">
            <img src="/src/assets/shopIcon.svg" alt="Jeans" />
          </div>
          <p>Jeans</p>
        </div>

        <div className="category-item">
          <div className="category-icon">
            <img src="/src/assets/shopIcon.svg" alt="bags" />
          </div>
          <p>Bags</p>
        </div>

        <div className="category-item">
          <div className="category-icon">
            <img src="/src/assets/shopIcon.svg" alt="Watches" />
          </div>
          <p>Watches</p>
        </div>

        <div className="category-item">
          <div className="category-icon">
            <img src="/src/assets/shopIcon.svg" alt="Cap" />
          </div>
          <p>Cap</p>
        </div>

      </div>


    <FlashSale />
    </div>
   
  )
}

export default Dashboard
