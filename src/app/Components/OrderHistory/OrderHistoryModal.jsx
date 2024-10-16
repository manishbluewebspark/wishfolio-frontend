import React from "react";
import "./orderhistory.css"; // Custom CSS file
import Image from "next/image";
import prodimg from "../../images/watchimg.png"; // Path to your image
import MyDoner from "../MyDoner/MyDoner";

const OrderHistoryModal = ({ isModalOpen, closeModal, order }) => {
  if (!isModalOpen) return null; // If modal is not open, return nothing
  const getSumOfAmounts = (donations) => {
    return donations.reduce((total, donation) => total + donation.amount, 0);
  };
  return (
    <div className="phis-modal-overlay">
      <div className="phis-modal-content">
        <span className="phis-modal-close" onClick={closeModal}>
          &times;
        </span>
        <div className="phis-modal-details">
          {/* Product Image in Modal */}
          <Image
            src={`${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${order.productImageUrl}`}
            alt="Product in modal"
            className="img-fluid"
            width={100}
            height={100}
            layout="responsive"
          />
          <h4>
            ₹{getSumOfAmounts(order.donationsDetails) || 0} / ₹
            {order.productPrice} Donated
          </h4>
          <p>{order.productName}</p>

          <div className="phis-donors">
            <MyDoner
              donationsDetails={order.donationsDetails}
              type="complete"
            ></MyDoner>
          </div>

          <div className="phis-address">
            <p>
              <strong>Address :</strong> {order.country}, {order.state},{" "}
              {order.city}
            </p>
            <p>
              Address Line 1: {order.address_line_1} {order.address_line_2}
            </p>
            <p>Pin Code: {order.pincode}</p>
            <p>Road Number:{order.roomNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryModal;
