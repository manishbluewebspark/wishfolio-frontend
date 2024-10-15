"use client";
import React, { useEffect, useState } from "react";
import Statistics from "../Components/mystatistics/Statistics";
import WishCard from "../Components/WishCard/WishCard"; // Ensure you have this component in place
import watchImage from "../images/watchimg.png";
import bagImage from "../images/bagimg.png";
import profileImage from "../images/Male15.png";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyDonations } from "../store/slices/myDonationsSlice";
const Page = () => {
  const dispatch = useDispatch();
  const { donationsData, isLoading, error } = useSelector(
    (state) => state.myDonations
  );
  const [minDonation, setMinDonation] = useState({});
  const { levels, loading } = useSelector((state) => state.levels);
  useEffect(() => {
    if (levels?.length > 0) {
      //  const foundData = levels.find((item) => item._id === products[0].levelId);
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

  return (
    <>
      <Statistics
        minDonation={minDonation?.minimumDonation}
        numberOfDoanation={minDonation?.numberOfDonations}
      />
      <div className="row product-con my-2">
        {donationsData?.data.map((product) => (
          <div className="col-md-6 col-sm-6 col-6 product-col" key={product.id}>
            <WishCard
              productImage={product.productImageUrl}
              title={product.productName}
              price={product.totalAmount || 0}
              donationGoal={product.productPrice}
              wishingByImage={product.wiseUserImage}
              wishingBy={product.wiseUserName}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
