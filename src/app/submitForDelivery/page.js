"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import AddressModal from "../Components/AddressModal/AddressModal";
import { fetchUserData } from "../store/slices/userSlice";
import { fetchAddresses } from "../store/slices/addressSlice";
import axios from "axios";
import styles from "./AddressPage.module.css";
import { fetchMyWish } from "../store/slices/myWishSlice";
import { useRouter } from "next/navigation";
const AddressPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedAddressType, setSelectedAddressType] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { addressData, isLoading, error } = useSelector(
    (state) => state.addresses
  );
  const { userData } = useSelector((state) => state.user);
  const { wishData } = useSelector((state) => state.myWishData);

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const uData = JSON.parse(user);
      dispatch(fetchAddresses(uData.id));
      dispatch(fetchUserData(uData.id));
      dispatch(fetchMyWish(uData.id));
    }
  }, [dispatch]);

  const openSuccessModal = async () => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        const uData = JSON.parse(user);
        dispatch(fetchUserData(uData.id)); // Fetch user data again after modal closes
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("An error occurred while fetching user data.");
    }
  };

  // Function to handle address selection
  const handleAddressSelect = (addressId, type) => {
    setSelectedAddressId(addressId);
    setSelectedAddressType(type);
  };

  // Function to submit the selected address for delivery
  const handleSubmitForDelivery = async () => {
    const productId = wishData.data.productId;
    const wishId = wishData.data._id;
    if (selectedAddressId) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/delivery`, // Replace with your API endpoint
          {
            addressId: selectedAddressId,
            productId: productId,
            addressType: selectedAddressType,
            userId: userData?._id,
            wishId: wishId,
          }
        );
        alert(response.data.message);
        router.push("/orderSuccess");
      } catch (error) {
        console.error("Error submitting for delivery:", error);
        alert("An error occurred while submitting for delivery.");
      }
    } else {
      alert("Please select an address for delivery.");
    }
  };

  return (
    <div className={`container mt-3 ${styles.container}`}>
      <div className="d-flex align-items-center mb-3">
        <button
          className="btn btn-link p-0 me-2"
          onClick={() => window.history.back()}
        >
          <i className="bi bi-arrow-left"></i>{" "}
          {/* Bootstrap Icon for back arrow */}
        </button>
        <h4 className="m-0">Address</h4>
      </div>

      {/* User's Main Address Card */}
      <div
        className={`card mb-3 p-3 border-0 shadow-sm ${styles.card} ${
          selectedAddressId === userData?._id ? styles.activeAddress : ""
        }`} // Apply active class if main address is selected
        onClick={() => handleAddressSelect(userData?._id, "main")} // Add onClick to select main address
      >
        <div className="d-flex justify-content-between">
          <h6>Main Address</h6>
          <Button variant="link" className="p-0">
            <i className="bi bi-pencil"></i> Edit{" "}
          </Button>
        </div>
        <p className="mb-1">
          {userData?.country} {userData?.state}
        </p>
        <p className="mb-1">
          {userData?.address_line_1} {userData?.address_line_2}
        </p>
        <p className="mb-1">Pin Code: {userData?.pincode}</p>
        <p className="mb-0">Room Number: {userData?.roomNumber}</p>
      </div>

      {/* Render Additional Addresses */}
      {addressData && addressData.length > 0 ? (
        addressData.map((item, index) => (
          <div
            key={index}
            className={`card mb-3 p-3 border-0 shadow-sm ${styles.card} ${
              selectedAddressId === item._id ? styles.activeAddress : ""
            }`} // Apply active class
            onClick={() => handleAddressSelect(item._id, "other")} // Add onClick to select address
          >
            <div className="d-flex justify-content-between">
              <h6>Address {index + 2}</h6>
              <Button variant="link" className="p-0">
                <i className="bi bi-pencil"></i> Edit{" "}
              </Button>
            </div>
            <p className="mb-1">
              {item.country} {item.state}
            </p>
            <p className="mb-1">
              {item.address_line_1} {item.address_line_2}
            </p>
            <p className="mb-1">Pin Code: {item.pincode}</p>
            <p className="mb-0">Room Number: {item.roomNumber}</p>
          </div>
        ))
      ) : (
        <p>No addresses found.</p>
      )}

      {/* Add New Address Button */}
      <div className="text-center mb-5">
        <button
          className="btn btn-link text-primary"
          style={{ fontSize: "16px" }}
          onClick={handleCardClick}
        >
          Add a New Address
        </button>
      </div>

      <AddressModal
        showModal={showModal}
        handleClose={handleCloseModal}
        openSuccessModal={openSuccessModal} // Pass the function here
      />

      {/* Submit for Delivery Button */}
      <Row className={`fixed-bottom ${styles["fixed-bottom-button"]}`}>
        <Col>
          <div className="text-center">
            <Button
              className={`btn-swipe ${styles["btn-swipe"]}`}
              block
              onClick={handleSubmitForDelivery} // Call API on click
            >
              Submit for Delivery
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AddressPage;
