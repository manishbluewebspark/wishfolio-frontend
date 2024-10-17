"use client";
import React, { useEffect, useState } from "react";
import Statistics from "../Components/mystatistics/Statistics";
import WishCard from "../Components/WishCard/WishCard"; // Ensure you have this component in place
import watchImage from "../images/watchimg.png";
import bagImage from "../images/bagimg.png";
import profileImage from "../images/Male15.png";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyDonations } from "../store/slices/myDonationsSlice";
import ProductModal from "../Components/WishCard/ProductModal";
const Page = () => {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { donationsData, isLoading, error } = useSelector(
    (state) => state.myDonations
  );
  const [minDonation, setMinDonation] = useState({});
  const { levels, loading } = useSelector((state) => state.levels);
  useEffect(() => {
    if (levels?.length > 0) {
      setMinDonation(levels[0]);
    }
  }, [levels, donationsData]);
  useEffect(() => {
    const getUserData = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const uData = JSON.parse(userData);
        dispatch(fetchMyDonations(uData.id));
      }
    };

    getUserData();
  }, [dispatch]);
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
  return (
    <>
      <Statistics
        minDonation={minDonation?.minimumDonation}
        numberOfDoanation={minDonation?.numberOfDonations}
      />
      <div className="row product-con my-2">
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
              donationGoal={product.productPrice}
              wishingByImage={product.wishingByImage}
              wishingBy={product.wishingBy}
              donationsDetails={product.donationsDetails}
              donated={product?.amount}
              type="myDonation"
            />
          </div>
        ))}
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            showModal={showModal}
            minDonation={minDonation}
            handleClose={handleCloseModal}
            openSuccessModal={handleOpensucessModal}
            isDonated={true}
          />
        )}
      </div>
    </>
  );
};

export default Page;
