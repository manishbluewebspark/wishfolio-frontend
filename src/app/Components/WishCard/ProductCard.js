"use client";
import { useState } from "react";
import WishCard from "./WishCard";
import ProductModal from "./ProductModal";
import watchImage from "../../images/watchimg.png";
import bagImage from "../../images/bagimg.png";
import profileImage from "../../images/Male15.png";

// Sample Product Data
const productData = [
  { 
    id: 1, 
    productImage: watchImage, 
    title: "Apple Watch Series 6", 
    price: 34000, 
    donationGoal: 54990, 
    category: "electronics", 
    donors: [
      { name: "Theresa Webb", profileImage: profileImage, donationAmount: 500 }
    ] 
  },
  { 
    id: 2, 
    productImage: bagImage, 
    title: "Versace Handbag", 
    price: 24000, 
    donationGoal: 40000, 
    category: "fashion", 
    donors: [
      { name: "Sinan CP", profileImage: profileImage, donationAmount: 500 }
    ] 
  },
  // Add more products as needed
];

export default function ProductCard() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Filter states
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterPriceRange, setFilterPriceRange] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state
  const [nestedDropdownOpen, setNestedDropdownOpen] = useState({ category: false, price: false });

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  // Filter products by category and price
  const filteredProducts = productData.filter((product) => {
    const matchesCategory = filterCategory === "all" || product.category === filterCategory;
    
    const matchesPrice = filterPriceRange === "all" || 
      (filterPriceRange === "low" && product.price < 30000) ||
      (filterPriceRange === "medium" && product.price >= 30000 && product.price <= 50000) ||
      (filterPriceRange === "high" && product.price > 50000);
    
    return matchesCategory && matchesPrice;
  });

  // Toggle dropdown state
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Toggle nested dropdown state for category and price
  const toggleNestedDropdown = (type) => {
    setNestedDropdownOpen((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  return (
    <div className="container-sm position-relative mb-2">
      {/* Filter Section */}
      <div className="d-flex justify-content-between align-items-center mb-2">
       <div className="d-block">
       <h2 className="wishing-items-title">Wishing Items</h2>
       <p className="price-range">₹5,000 – ₹10,000 Worth Items</p>
       </div>

        <div className="filter-by">
          <a className="dropdown-toggle" onClick={toggleDropdown}>
            Filter by
          </a>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <div className="nested-dropdown">
                <button className="nested-toggle" onClick={() => toggleNestedDropdown('category')}>
                  All Categories
                </button>
                {nestedDropdownOpen.category && (
                  <div className="nested-dropdown-menu">
                    <button onClick={() => setFilterCategory("all")}>All</button>
                    <button onClick={() => setFilterCategory("electronics")}>Electronics</button>
                    <button onClick={() => setFilterCategory("fashion")}>Fashion</button>
                    {/* Add more categories */}
                  </div>
                )}
              </div>
              
              <div className="nested-dropdown">
                <button className="nested-toggle" onClick={() => toggleNestedDropdown('price')}>
                  All Prices
                </button>
                {nestedDropdownOpen.price && (
                  <div className="nested-dropdown-menu">
                    <button onClick={() => setFilterPriceRange("all")}>All</button>
                    <button onClick={() => setFilterPriceRange("low")}>Below ₹30,000</button>
                    <button onClick={() => setFilterPriceRange("medium")}>₹30,000 - ₹50,000</button>
                    <button onClick={() => setFilterPriceRange("high")}>Above ₹50,000</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>


      {/* Product Cards */}
      <div className="row product-con">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col-md-6 col-sm-6 col-6 product-col" key={product.id} onClick={() => handleCardClick(product)}>
              <WishCard
                productImage={product.productImage}
                title={product.title}
                price={product.price}
                donationGoal={product.donationGoal}
              />
            </div>
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          showModal={showModal}
          handleClose={handleCloseModal}
        />
      )}
    </div>
  );
}
