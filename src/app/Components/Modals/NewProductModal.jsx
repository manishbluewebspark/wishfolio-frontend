import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import CurrencyName from "../Comman/CurrencyName";
import Statistics from "../mystatistics/Statistics";
import MyDoner from "../MyDoner/MyDoner";
import profilePic from "../../images/profile.svg";
import crossicon from "../../images/cross.svg"

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const ProductModalNew = ({
  product,
  isOpen,
  onClose,
  minDonation,
  openSuccessModal,
  isDonated,
}) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(null);
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const handleDonateClick = async () => {
    if (userData?._id) {
      if (userData?.accountBalance >= amount) {
        if (product.productPrice - getSumOfAmounts(product.donationsDetails) >= amount) {
          const formData = {
            productId: product.productId,
            userId: userData._id,
            amount: amount,
            wiseProductId: product._id,
          };

          try {
            const response = await axios.post(`${API_BASE_URL}/product/donation`, formData);
            if (response.status === 201) {
              openSuccessModal();
            } else {
              toast.error("Donation failed");
            }
          } catch (error) {
            toast.error("An error occurred during the Donation");
          }
        } else {
          toast.error("Insufficient balance");
        }
      } else {
        toast.error("Insufficient balance");
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
    return ((totalAmount / specifiedAmount) * 100).toFixed(2); // Format to two decimal places
  };

  return (
    <div className={`npmc-product-modal ${isOpen ? "open" : ""}`}>
      <div className="npmc-modal-wrapper">
        <div className="npmc-modal-content">
          <div className="npmc-close-btn-con">
          <button onClick={onClose} className="npmc-close-btn">
            <Image src={crossicon} height={9} width={9} alt="x"></Image>
          </button>
          </div>
          <div className="modal-body npmc-modal-body">
          <div className="npmc-img-con">
          <Image
            src={`${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${product.productImageUrl}`}
            alt={product.productName}
            width={136}
            height={153}
          />
          </div>

          <div className="product-details">
            <p className="npmc-wish-by">
              Wish by{" "}
              <Image
                src={
                  product.wishingByImage
                    ? `${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${product.wishingByImage}`
                    : profilePic
                }
                alt="User Profile"
                width={20}
                height={20}
                className="profile-pic"
                style={{ marginRight: "4px" }}
              />{" "}
              <strong style={{ color: "black" }}>{product.wishingBy}</strong>
            </p>

            <p className="price">
              <strong style={{color:"black"}}> <CurrencyName /> {getSumOfAmounts(product.donationsDetails) || 0}</strong>/
              <CurrencyName />
              {product.productPrice?.toLocaleString()}{"  "}
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
                  <div className="npmc-btn-in-con">
                  <input
                    type="text"
                    className="donateInput"
                    onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ''))}
                    placeholder="₹0"
                    value={amount ? `₹${amount}` : ''}
                  />
                  <button className="npmc-donate-btn" onClick={handleDonateClick}>
                    Donate
                  </button>
                  </div>
                  <p className="npmc-curr-blc text-center">
                    Current Balance: 
                    <strong style={{color:"black"}}><CurrencyName />{userData?.accountBalance || 0}</strong>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModalNew;