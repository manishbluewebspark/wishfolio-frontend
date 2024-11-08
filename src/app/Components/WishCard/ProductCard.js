"use client";
import { useState, useEffect } from "react";
import WishCard from "./WishCard";
import ProductModal from "./ProductModal";
import watchImage from "../../images/watchimg.png";
import bagImage from "../../images/bagimg.png";
import profileImage from "../../images/Male15.png";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../../store/slices/userSlice";
import { fetchProductsByLevel } from "../../store/slices/productByLevelSlice";
import ProductModalNew from '../Modals/NewProductModal';

import SuccessModal from "./successModal";
// Sample Product Data

export default function ProductCard() {
  const dispatch = useDispatch();
  // const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selected, setSelected] = useState("");
  const [minDonation, setMinDonation] = useState({});
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterPriceRange, setFilterPriceRange] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state

  // =========================
  const [showProductModal, setShowProductModal] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);

// Function to open modal when a product is clicked
const handleCardClick = (product) => {
  setSelectedProduct(product);
  setShowProductModal(true);
};

// Function to close modal
const handleCloseModal = () => {
  setShowProductModal(false);
  setSelectedProduct(null);
};

  // ==========================
  const [nestedDropdownOpen, setNestedDropdownOpen] = useState({
    category: false,
    price: false,
  });
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.productsByLevel);
  const { levels, loading, error } = useSelector((state) => state.levels);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const uData = JSON.parse(userData);
        setUser(uData);
        dispatch(fetchUserData(uData.id));
      }
    };

    getUserData(); // Call the function
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setSelected(products[0].levelId);
      const foundData = levels.find((item) => item._id === products[0].levelId);
      setMinDonation(foundData);
    }
  }, [levels, products]);
  // const handleCardClick = (product) => {
  //   setSelectedProduct(product);
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   setSelectedProduct(null);
  // };

  const handleOpensucessModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setShowSuccessModal(true);
  };
  const handleCloseSuccessModal = () => {
    dispatch(fetchProductsByLevel(levels[0]._id));
    dispatch(fetchUserData(user.id));
    setShowSuccessModal(false);
  };
  // Filter products by category and price
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      filterCategory === "all" || product.categoryId === filterCategory;

    const matchesPrice =
      filterPriceRange === "all" ||
      (filterPriceRange === "low" && product.productPrice < 30000) ||
      (filterPriceRange === "medium" &&
        product.price >= 30000 &&
        product.price <= 50000) ||
      (filterPriceRange === "high" && product.productPrice > 50000);

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
    <div className="home-container-wishing container ">
      {/* Filter Section */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-block">
          <h2 className="wishing-items-title">Wishing Items</h2>
          <p className="price-range">₹5,000 – ₹10,000 Worth Items</p>
        </div>

        {/* <div className="filter-by">
          <a className="dropdown-toggle" onClick={toggleDropdown}>
            Filter by
          </a>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <div className="nested-dropdown">
                <button
                  className="nested-toggle"
                  onClick={() => toggleNestedDropdown("category")}
                >
                  All Categories
                </button>
                {nestedDropdownOpen.category && (
                  <div className="nested-dropdown-menu">
                    <button onClick={() => setFilterCategory("all")}>
                      All
                    </button>
                    <button onClick={() => setFilterCategory("electronics")}>
                      Electronics
                    </button>
                    <button onClick={() => setFilterCategory("fashion")}>
                      Fashion
                    </button>
                  </div>
                )}
              </div>

              <div className="nested-dropdown">
                <button
                  className="nested-toggle"
                  onClick={() => toggleNestedDropdown("price")}
                >
                  All Prices
                </button>
                {nestedDropdownOpen.price && (
                  <div className="nested-dropdown-menu">
                    <button onClick={() => setFilterPriceRange("all")}>
                      All
                    </button>
                    <button onClick={() => setFilterPriceRange("low")}>
                      Below ₹30,000
                    </button>
                    <button onClick={() => setFilterPriceRange("medium")}>
                      ₹30,000 - ₹50,000
                    </button>
                    <button onClick={() => setFilterPriceRange("high")}>
                      Above ₹50,000
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div> */}
      </div>

      {/* Product Cards */}
      <div className="row product-con">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              className="col-lg-6 col-md-6 col-sm-6 col-6 product-col"
              key={product.id}
              onClick={() => handleCardClick(product)}
            >
              <WishCard
                minDonation={minDonation?.minimumDonation}
                productImage={product.productImageUrl}
                title={product.productName}
                price={product.donationGoal || 0}
                donationGoal={product.productPrice}
                wishingBy={product.wishingBy}
                wishingByImage={product.wishingByImage}
                donationsDetails={product.donationsDetails}
              />
            </div>
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>

      {/* Modal */}
      {/* {showModal && selectedProduct && (
  <ProductModal
    product={selectedProduct}
    showModal={showModal}
    minDonation={minDonation}
    handleClose={handleCloseModal}
    openSuccessModal={handleOpensucessModal}
  />
)} */}
{showProductModal && selectedProduct && (
  <ProductModalNew
    product={selectedProduct}
    isOpen={showProductModal}
    onClose={handleCloseModal}
    minDonation={minDonation}
    openSuccessModal={handleOpensucessModal}
    // isDonated={isDonated} // Pass the isDonated state as needed
  />
)}

      {showSuccessModal && (
        <SuccessModal
          showModal={showSuccessModal}
          handleClose={handleCloseSuccessModal}
        />
      )}
    </div>
  );
}
