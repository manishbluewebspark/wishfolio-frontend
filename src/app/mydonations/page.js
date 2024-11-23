"use client";
import React, { useEffect, useState } from "react";
import Statistics from "../Components/mystatistics/Statistics";
import WishCard from "../Components/WishCard/WishCard"; // Ensure you have this component in place
import ProductModal from "../Components/WishCard/ProductModal";
import LoginComponent from "../Components/LoginComponent/LoginComponent";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyDonations } from "../store/slices/myDonationsSlice";
import ProductModalNew from "../Components/Modals/NewProductModal";
import ProModal from "../Components/Modals/ProModal";

const Page = () => {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for tracking login status
  const { donationsData, isLoading, error } = useSelector(
    (state) => state.myDonations
  );
  const [minDonation, setMinDonation] = useState({});
  const { levels, loading } = useSelector((state) => state.levels);

  // Track user login status
  useEffect(() => {
    const getUserData = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const uData = JSON.parse(userData);
        setIsLoggedIn(true); // Set logged in status to true
        dispatch(fetchMyDonations(uData.id));
      } else {
        setIsLoggedIn(false); // Set logged in status to false
      }
    };

    getUserData();
  }, [dispatch]);

  useEffect(() => {
    if (levels?.length > 0) {
      setMinDonation(levels[0]);
    }
  }, [levels, donationsData]);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleOpensucessModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    // setShowSuccessModal(true);
  };

  // If the user is not logged in, show the LoginComponent
  if (!isLoggedIn) {
    return <LoginComponent />;
  }

  // Render the donations page if the user is logged in
  return (
    <>
      <Statistics
        minDonation={minDonation?.minimumDonation}
        numberOfDoanation={minDonation?.numberOfDonations}
      />
      <div className="row product-con">
        {donationsData?.data.map((product) => (
          <div
            className="col-md-6 col-sm-6 col-6 product-col"
            key={product.id}
            onClick={() => handleCardClick(product)}
          >
            <WishCard
              productImage={product.productImageUrl}
              title={product.productName}
              price={product.totalAmount || 0}
              donationGoal={
                product.productPrice > 0
                  ? product.productPrice
                  : product.productOriName
              }
              wishingByImage={product.wishingByImage}
              wishingBy={product.wishingBy}
              donationsDetails={product.donationsDetails}
              donated={product?.amount}
              type="myDonation"
            />
          </div>
        ))}
        {selectedProduct && (
          <ProductModalNew
            product={selectedProduct}
            showModal={showModal}
            minDonation={minDonation}
            onClose={handleCloseModal}
            openSuccessModal={handleOpensucessModal}
            isDonated={true}
            isOpen={showModal}
          />
        )}
      </div>
    </>
  );
};

export default Page;
