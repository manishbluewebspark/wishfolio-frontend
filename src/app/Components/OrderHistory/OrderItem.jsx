import React, { useState } from "react";
// import "./orderhistory.css"; // Custom CSS file
import Image from "next/image";
import OrderHistoryModal from "./OrderHistoryModal"; // Import the new modal component
import RatingModal from "./RatingModal"; // Import the rating modal component
import CurrencyName from "../Comman/CurrencyName";
import MyOrderOnGoingModal from "../../Components/Modals/MyOrderOnGoingModal";
import ReviewModal from "../../Components/Modals/ReviewModal";
const OrderItem = ({ order, activeTab }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state for order details
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false); // Modal state for rating

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openRatingModal = () => {
    setIsRatingModalOpen(true);
  };

  const closeRatingModal = () => {
    setIsRatingModalOpen(false);
  };

  function getDateAndTimeFromISO(isoString) {
    const dateObj = new Date(isoString);
    const date = dateObj.toISOString().split("T")[0];
    const time = dateObj.toISOString().split("T")[1].split(".")[0];
    return { date, time };
  }

  return (
    <div>
      {/* Order Item */}
      <div className="container phis-order-item-con">
        <div className="phis-order-item row align-items-center">
          {/* Product Image */}
          <div className="col-3" onClick={openModal}>
            <div className="phis-thumbnil">
              <Image
                src={`${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${order.productImageUrl}`}
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
            <h6 className="phis-product-name">{order.productName}</h6>
            <p className="phis-order-date">
              {getDateAndTimeFromISO(order?.updatedAt)?.date} •{" "}
              {getDateAndTimeFromISO(order?.updatedAt)?.time}
            </p>
            <p className="phis-delivery-status">
              <i className="fas fa-shipping-fast"></i>{" "}
              {activeTab === "ongoing" ? (
                "On the way"
              ) : (
                <>
                  {order?.imageUrl ? (
                    "Reviewed"
                  ) : (
                    <span
                      onClick={openRatingModal}
                      style={{
                        cursor: "pointer",
                        color: "#90AEFF",
                        fontSize: "16px",
                        fontWeight: "800",
                      }}
                    >
                      Rate Us
                    </span>
                  )}
                </>
              )}
            </p>
          </div>

          {/* Price */}
          <div className="col-3 phis-price text-right">
            <h6 className="phis-price-value">
              <CurrencyName />
              {order.productPrice}
            </h6>
          </div>
        </div>
      </div>

      {/* Modal Component for Order Details */}
      <MyOrderOnGoingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        order={order}
      />

      {/* Rating Modal Component */}
      <ReviewModal
        isOpen={isRatingModalOpen}
        onClose={closeRatingModal}
        order={order}
      />
    </div>
  );
};

export default OrderItem;
