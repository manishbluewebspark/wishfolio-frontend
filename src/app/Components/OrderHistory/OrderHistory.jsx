"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyOrders } from "../../store/slices/myOrderSlice"; // Assuming you have myOrderSlice ready
import "./orderhistory.css"; // Custom CSS file
import BackButton from "../Button/BackButton";
import OrderItem from "./OrderItem";

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState("ongoing"); // State for active tab
  const dispatch = useDispatch();

  // Memoize the user object to prevent unnecessary re-renders
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);

  // Get orders data and loading state from Redux
  const { orderData, isLoading, error } = useSelector((state) => state.myOrder);

  // Fetch orders based on the active tab (ongoing/completed)
  useEffect(() => {
    if (user) {
      // Fetch orders with status based on the active tab
      dispatch(
        fetchMyOrders({
          userId: user.id,
          status: activeTab === "ongoing" ? 0 : 1,
        })
      );
    }
  }, [dispatch, user, activeTab]); // Dependency on user and activeTab

  return (
    <div>
      <BackButton title={"My Orders"} />
      <div className="container phis-container">
        <div className="phis-tabs row">
          <div
            className={`col phis-tab ${
              activeTab === "ongoing" ? "phis-active" : ""
            }`}
            onClick={() => setActiveTab("ongoing")} // Set active tab to 'ongoing'
          >
            Ongoing
          </div>
          <div
            className={`col phis-tab ${
              activeTab === "completed" ? "phis-active" : ""
            }`}
            onClick={() => setActiveTab("completed")} // Set active tab to 'completed'
          >
            Completed
          </div>
        </div>

        {/* Content */}
        <div className="phis-content">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : activeTab === "ongoing" && orderData?.length > 0 ? (
            <div>
              {orderData.map((order) => (
                <OrderItem
                  key={order._id}
                  order={order}
                  activeTab={activeTab}
                />
              ))}
            </div>
          ) : activeTab === "ongoing" && orderData?.length === 0 ? (
            <p className="phis-empty-message">No ongoing orders found.</p>
          ) : activeTab === "completed" && orderData?.length > 0 ? (
            <div>
              {orderData.map((order) => (
                <OrderItem
                  key={order._id}
                  order={order}
                  activeTab={activeTab}
                />
              ))}
            </div>
          ) : (
            <p className="phis-empty-message">
              You don’t have any completed orders yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
