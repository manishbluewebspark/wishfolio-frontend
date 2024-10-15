import React from 'react';
import './orderhistory.css'; // Custom CSS file
import Image from 'next/image';
import prodimg from '../../images/watchimg.png'; // Path to your image
import MyDoner from '../MyDoner/MyDoner';

const OrderHistoryModal = ({ isModalOpen, closeModal }) => {
  if (!isModalOpen) return null; // If modal is not open, return nothing

  return (
    <div className="phis-modal-overlay">
      <div className="phis-modal-content">
        <span className="phis-modal-close" onClick={closeModal}>
          &times;
        </span>
        <div className="phis-modal-details">
          {/* Product Image in Modal */}
          <Image 
            src={prodimg} 
            alt="Product in modal" 
            className="img-fluid"
            width={100}  
            height={100} 
            layout="responsive"
          />
          <h4>₹54,990 / ₹54,990 Donated</h4>
          <p>SONY PlayStation 5 console 825 GB</p>

          <div className="phis-donors">
            {/* <h5>Donors 6/10</h5>
           
            <ul>
              <li>Theresa Webb - ₹500</li>
              <li>Ronald Richards - ₹500</li>
              <li>Bessie Cooper - ₹500</li>
              <li>Sinan CP - ₹500</li>
            </ul> */}
            <MyDoner></MyDoner>
          </div>

          <div className="phis-address">
            <p><strong>Address Line 2:</strong> India, Kerala, Malappuram</p>
            <p>Address Line 1: Address Line 1</p>
            <p>Pin Code: 4828642</p>
            <p>Road Number: 353 C</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryModal;
