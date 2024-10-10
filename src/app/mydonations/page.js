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
  const productData = [
    {
      id: 1,
      productImage: watchImage,
      title: "Apple Watch Series 6",
      price: 34000,
      donationGoal: 54990,
      category: "electronics",
      donors: [
        {
          name: "Theresa Webb",
          profileImage: profileImage,
          donationAmount: 500,
        },
      ],
    },
    {
      id: 2,
      productImage: bagImage,
      title: "Versace Handbag",
      price: 24000,
      donationGoal: 40000,
      category: "fashion",
      donors: [
        { name: "Sinan CP", profileImage: profileImage, donationAmount: 500 },
      ],
    },
    // Add more products as needed
  ];
  console.log("minDonation", minDonation);

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
