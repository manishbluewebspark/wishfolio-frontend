"use client";
import Image from 'next/image';
// import profilePic from '../../images/profile.png'; // Profile image
import './style.css'; // Custom styles

const WishCard = ({ productImage, title, price, donated, donationGoal }) => {
  return (
    <div className="wish-card">
      {/* Product Image */}
      <div className='wish-card-img'>
      <Image src={productImage} alt={title} className="product-image" width={163} height={183} />
      </div>

      {/* Donation Button */}
      <div className="donation-button-container">
        <div className="donate-button">
          <span>Donate</span> <strong>₹2,400</strong>
        </div>
      </div>

      {/* Wish Info */}
      <div className="wish-info">
        <p className="wish-by">
          Wish by <Image src={''} alt="User Profile" width={20} height={20} className="profile-pic" /> Sinan CP
        </p>

        {/* Price Info */}
        <p className="price">
          ₹{price.toLocaleString()} / ₹{donationGoal.toLocaleString()} <span className="donated">Donated</span>
        </p>

        {/* Product Title */}
        <p className="product-title">{title}</p>

        {/* Progress Bar */}
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${(price / donationGoal) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default WishCard;
