import React, { useState } from 'react';
import './orderhistory.css'; // Custom CSS file
import prodimg from '../../images/watchimg.png';
import Image from 'next/image';
import OrderHistoryModal from './OrderHistoryModal'; // Import the new modal component

const OrderItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Order Item */}
      <div className="container phis-order-item-con" onClick={openModal}>
        <div className="phis-order-item row align-items-center">
          {/* Product Image */}
          <div className="col-3">
            <div className="phis-thumbnil">
              <Image 
                src={prodimg} 
                alt="Product" 
                className="img-fluid phis-product-image"
                width={56.89}  
                height={63.8} 
                layout="responsive"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="col-6 phis-product-info">
            <h6 className="phis-product-name">Iphone16 Pro Max</h6>
            <p className="phis-order-date">25 Jan 2024 • 12:34 AM</p>
            <p className="phis-delivery-status">
              <i className="fas fa-shipping-fast"></i> On the way
            </p>
          </div>

          {/* Price */}
          <div className="col-3 phis-price text-right">
            <h6 className="phis-price-value">₹4,500</h6>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <OrderHistoryModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default OrderItem;
