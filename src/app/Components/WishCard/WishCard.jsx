"use client";
import Image from "next/image";
// import profilePic from '../../images/profile.png'; // Profile image
import "./style.css"; // Custom styles

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
        <Image
          src={`${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${productImage}`}
          alt={title}
          className="product-image"
          width={163}
          height={183}
        />
      </div>

      {/* Donation Button */}
      <div className="donation-button-container">
        <div className="donate-button">
          <span>Donate</span> <strong>₹{minDonation}</strong>
        </div>
      </div>

      {/* Wish Info */}
      <div className="wish-info">
        <p className="wish-by">
          Wish by{" "}
          <Image
            src={`${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${wishingByImage}`}
            alt="User Profile"
            width={20}
            height={20}
            className="profile-pic"
            style={{ marginRight: "4px" }}
          />
          {"  "}
          {wishingBy}
        </p>

        {/* Price Info */}
        <p className="price">
          ₹{getSumOfAmounts(donationsDetails)} / ₹
          {donationGoal.toLocaleString()}{" "}
          <span className="donated" style={{ marginLeft: "4px" }}>
            {" "}
            Donated
          </span>
        </p>

        {/* Product Title */}
        <p className="product-title">{title}</p>

        {/* Progress Bar */}
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${calculatePercentageOfAmount(donationGoal)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default WishCard;
