"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./style.css"; // Custom styles for modal
import Statistics from "../mystatistics/Statistics";

import MyDoner from "../MyDoner/MyDoner";
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const ProductModal = ({
  product,
  showModal,
  handleClose,
  minDonation,
  openSuccessModal,
  isDonated,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [amout, setAmount] = useState(null);
  const { userData, isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  const handleDonateClick = async () => {
    if (userData?._id) {
      const formData = {
        productId: product.productId,
        userId: userData._id,
        amount: amout,
        wiseProductId: product._id,
      };

      try {
        const response = await axios.post(
          `${API_BASE_URL}/product/donation`,
          formData
        );

        if (response.status === 201) {
          openSuccessModal();
        } else {
          console.error("Deposit failed:", response);
        }
      } catch (error) {
        console.error("An error occurred during the deposit:", error);
      }
    } else {
      window.alert("Please login first");
    }
  };
  const getSumOfAmounts = (donations) => {
    return donations.reduce((total, donation) => total + donation.amount, 0);
  };
  const calculatePercentageOfAmount = (specifiedAmount) => {
    const totalAmount = getSumOfAmounts(product.donationsDetails);

    const percentage = ((totalAmount / specifiedAmount) * 100).toFixed(2); // Format to two decimal places
    return percentage;
  };
  return (
    <div className={`bottom-modal ${showModal ? "open" : ""}`}>
      <div className="modal-content">
        <div className="modal-header">
          <button onClick={handleClose} className="close-btn">
            &times;
          </button>
        </div>
        <div className="modal-body">
          <Image
            src={`${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${product.productImageUrl}`}
            alt={product.productName}
            width={200}
            height={200}
          />

          <div className="product-details">
            <p>
              Wish by{" "}
              <Image
                src={`${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${product.wishingByImage}`}
                alt="User Profile"
                width={20}
                height={20}
                className="profile-pic"
                style={{ marginRight: "4px" }}
              />{" "}
              {product.wishingBy}
            </p>

            <p className="price">
              ₹ {getSumOfAmounts(product.donationsDetails) || 0}/ ₹
              {product.productPrice.toLocaleString()}{" "}
              <span className="donated"> Donated</span>
            </p>

            <p className="product-title">{product.productName}</p>

            <div className="progress-bar-container">
              {/* <div
                className="progress-bar"
                style={{
                  width: `${calculatePercentageOfAmount(
                    product.productPrice
                  )}%`,
                  backgroundColor:
                    calculatePercentageOfAmount(product.productPrice) >= 100
                      ? "#00C036 !important"
                      : "#4A90E2",
                }}
              ></div> */}
              <div
                className={`progress-bar ${
                  calculatePercentageOfAmount(product.productPrice) >= 100
                    ? "progress-bar-success"
                    : "progress-bar-default"
                }`}
                style={{
                  width:
                    calculatePercentageOfAmount(product.productPrice) >= 100
                      ? "100%"
                      : `${calculatePercentageOfAmount(product.productPrice)}%`,
                }}
              ></div>
            </div>
            <hr />
            <Statistics
              isPayment={true}
              minDonation={minDonation.minimumDonation}
              price={product.productPrice}
              numberOfDoanation={minDonation.numberOfDonations}
              remaningDonation={
                minDonation.numberOfDonations - product.donationsDetails.length
              }
            />

            <div className="donors-section">
              {/* Donors List */}
              <MyDoner donationsDetails={product.donationsDetails}></MyDoner>
            </div>

            <div className="donate-section">
              {calculatePercentageOfAmount(product.productPrice) >= 100 ? ( // Check if funded status
                <button className="donate-btn-disable">
                  Funded Successfully!
                </button>
              ) : isDonated ? (
                <button className="donate-btn-disable">Already Donated!</button>
              ) : (
                <>
                  <input
                    type="text"
                    className="donateInput"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amout}
                  />
                  <button className="donate-btn" onClick={handleDonateClick}>
                    Donate
                  </button>
                  <p>Current Balance: ₹{userData?.accountBalance || 0}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
