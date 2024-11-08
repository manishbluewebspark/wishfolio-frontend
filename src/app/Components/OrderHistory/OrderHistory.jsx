"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyOrders } from "../../store/slices/myOrderSlice"; // Assuming you have myOrderSlice ready
// import "./orderhistory.css"; // Custom CSS file
import BackButton from "../Button/BackButton";
import OrderItem from "./OrderItem";
import { fetchUserData } from "../../store/slices/userSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
const OrderHistory = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("ongoing"); // State for active tab
  const [user, setUser] = useState(null); // State for storing the user data from localStorage
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.user);
  // Use useEffect to safely access localStorage on the client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        dispatch(fetchUserData(storedUser.id));
      }
    }
  }, []);
  useEffect(() => {
    const fetchLevelData = async () => {
      if (userData?.userLevel) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/user/checkLeve/${userData._id}`
          );
          const checkData = response.data?.user?.userLevel;

          if (checkData > userData?.userLevel) {
            router.push("/levelup");
          }
          // setLevelData(response.data?.data);
        } catch (error) {
          console.error("Error fetching level data:", error);
        }
      }
    };

    fetchLevelData();
  }, [userData]);
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
    <>
      <BackButton title={"My Orders"} />
      <div className="phis-container container">
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
    </>
  );
};

export default OrderHistory;
