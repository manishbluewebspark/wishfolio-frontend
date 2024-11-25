"use client";
import Image from "next/image";
import profilePic from "../../images/profile.svg"; // Profile image
// import "./style.css"; // Custom styles
import CurrencyName from "../Comman/CurrencyName";

const WishCard = ({
  productImage,
  title,
  price,
  donated,
  donationGoal,
  minDonation,
  wishingBy,
  wishingByImage,
  donationsDetails,
  type,
  isHighlighted = true,
}) => {
  const getSumOfAmounts = (donations) => {
    return donations?.reduce((total, donation) => total + donation.amount, 0);
  };
  const calculatePercentageOfAmount = (specifiedAmount) => {
    const totalAmount = getSumOfAmounts(donationsDetails);

    const percentage = ((totalAmount / specifiedAmount) * 100).toFixed(2); // Format to two decimal places
    return percentage;
  };

  return (
    <div className="wish-card">
      {/* Product Image */}

      <div className="wish-card-img">
        {!isHighlighted && (
          <div class="wish-card-overlay">
            <p class="listing-text">Listing Soon</p>
          </div>
        )}

        <Image
          src={`${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${productImage}`}
          alt={title}
          className="product-image"
          width={163}
          height={183}
        />
      </div>

      {type === "myDonation" && (
        <div className="donation-funding-container">
          <div className="donate-button">
            <strong
              className={`r ${
                calculatePercentageOfAmount(donationGoal) >= 100
                  ? "text-success-color"
                  : ""
              }`}
            >
              {calculatePercentageOfAmount(donationGoal) >= 100
                ? "Success"
                : "Funding"}
            </strong>
          </div>
        </div>
      )}
      {type === "myDonation" && (
        <div className="donation-button-container">
          <div className="donate-button">
            <strong>
              <CurrencyName />
              {donated}
            </strong>
          </div>
        </div>
      )}
      {/* Wish Info */}
      <div className="wish-info">
        <p className="wish-by">
          Wish by{" "}
          <Image
            src={
              wishingByImage
                ? `${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${wishingByImage}`
                : profilePic
            }
            alt="User Profile"
            width={14}
            height={14}
            className="profile-pic"
            style={{ marginRight: "4px" }}
          />
          {"  "}
          <strong style={{ color: "black" }}>{wishingBy}</strong>
        </p>

        {/* Price Info */}
        <p className="price">
          {/* ₹{getSumOfAmounts(donationsDetails) || price}  */}
          <CurrencyName />
          {getSumOfAmounts(donationsDetails) || price}/
          <span
            className="donated"
            style={{ marginLeft: "4px", color: "#A48888" }}
          >
            <CurrencyName />
            {donationGoal?.toLocaleString()} Funded
          </span>
        </p>

        {/* Product Title */}
        <p className="product-title">{title}</p>

        {/* Progress Bar */}
        <div className="progress-bar-container">
          <div
            className={`progress-bar ${
              calculatePercentageOfAmount(donationGoal) >= 100
                ? "progress-bar-success"
                : "progress-bar-default"
            }`}
            style={{
              width:
                calculatePercentageOfAmount(donationGoal) >= 100
                  ? "100%"
                  : `${calculatePercentageOfAmount(donationGoal)}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default WishCard;
