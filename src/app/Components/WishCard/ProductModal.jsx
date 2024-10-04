"use client";
import { useEffect } from 'react';
import Image from 'next/image';
import './style.css'; // Custom styles for modal

const ProductModal = ({ product, showModal, handleClose }) => {
  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : 'auto';
  }, [showModal]);

  return (
    <div className={`bottom-modal ${showModal ? 'open' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <button onClick={handleClose} className="close-btn">&times;</button>
        </div>
        <div className="modal-body">
          {/* Product Image */}
          <Image src={product.productImage} alt={product.title} width={200} height={200} />

          <div className="product-details">
            <p>Wish by <Image src={product.profileImage} alt="User Profile" width={20} height={20} className="profile-pic" /> Sinan CP</p>

            <p className="price">₹{product.price.toLocaleString()} / ₹{product.donationGoal.toLocaleString()} <span className="donated">Donated</span></p>

            <p className="product-title">{product.title}</p>

            <hr />

            {/* Statistics Section */}
            <div className="my-statistics">
              <h3>My Statistic</h3>
              <p>Min Donations: ₹4,500 / ₹10,000</p>
              <p>Number of Donations: 4 / 10</p>
            </div>

            {/* Donors List */}
            <div className="donors-section">
              <h3>Donors 6/10</h3>
              <ul>
                {product.donors.map((donor, index) => (
                  <li key={index}>
                    <Image src={donor.profileImage} alt={donor.name} width={20} height={20} className="donor-pic" />
                    {donor.name} <span className="donation-amount">+{donor.donationAmount}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Donate Button */}
            <div className="donate-section">
              <button className="donate-btn">Donate ₹2,400.00</button>
              <p>Current Balance: ₹{product.donationGoal.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
