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
import { toast } from "react-toastify";
import BackButton from "../Components/Button/BackButton";
import NewAddressModal from "../Components/Modals/NewAddressModal";
import editIcon from "../images/edit2color.svg";
import Image from "next/image";
import GotRequestModal from "../Components/Modals/GotRequestModal";

const AddressPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedAddressType, setSelectedAddressType] = useState("");
  const [showSucessModal, setShowSucessModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null); // New state for selected address

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
    setEditingAddress(null);
    const user = localStorage.getItem("user");
    if (user) {
      const uData = JSON.parse(user);
      dispatch(fetchAddresses(uData.id));
    }
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
        dispatch(fetchUserData(uData.id));
        setEditingAddress(null);
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
        // alert(response.data.message);
        toast.success(response.data.message);
        setShowSucessModal(true);
        const timer = setTimeout(() => {
          router.push("/levelup");
        }, 5000);
      } catch (error) {
        console.error("Error submitting for delivery:", error);
        alert("An error occurred while submitting for delivery.");
      }
    } else {
      alert("Please select an address for delivery.");
    }
  };

  // Function to handle edit button click
  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setShowModal(true);
  };
  // console.log("editingAddress=====", editingAddress);

  return (
    <>
      <BackButton title={"Address"}></BackButton>
      <div className={`container newClassForaddress ${styles.container} h-100`}>
        {/* User's Main Address Card */}
        <div
          className={`card delivery-address-con  ${styles.card} ${
            selectedAddressId === userData?._id ? styles.activeAddress : ""
          }`} // Apply active class if main address is selected
          onClick={() => handleAddressSelect(userData?._id, "main")} // Add onClick to select main address
        >
          <div className="d-flex justify-content-between">
            <h6 className="delivery-address-text-head">Address Line 1</h6>
            <Button
              variant="text"
              className="p-0 edit-button-address"
              onClick={() => handleEditAddress(userData)} // Pass user data for editing
            >
              <Image src={editIcon} width="17" height="17" alt="edit" /> Edit
            </Button>
          </div>
          <p className="mb-1 delivery-address-subtext">
            {userData?.country} {userData?.state}
          </p>
          <p className="mb-1 delivery-address-subtext">
            {userData?.address_line_1} {userData?.address_line_2}
          </p>
          <p className="mb-1 delivery-address-subtext">
            Pin Code: {userData?.pincode}
          </p>
          <p className="mb-0 delivery-address-subtext">
            Room Number: {userData?.roomNumber}
          </p>
        </div>

        {/* Render Additional Addresses */}
        {addressData && addressData.length > 0 ? (
          addressData.map((item, index) => (
            <div
              key={index}
              className={`card delivery-address-con ${styles.card} ${
                selectedAddressId === item._id ? styles.activeAddress : ""
              }`} // Apply active class
              onClick={() => handleAddressSelect(item._id, "other")} // Add onClick to select address
            >
              <div className="d-flex justify-content-between">
                <h6 className="delivery-address-text-head">
                  Address {index + 2}
                </h6>
                <Button
                  variant="text"
                  className="p-0 edit-button-address"
                  onClick={() => handleEditAddress(item)} // Pass item data for editing
                >
                  <Image src={editIcon} width="17" height="17" alt="edit" />{" "}
                  Edit{" "}
                </Button>
              </div>
              <p className="mb-1 delivery-address-subtext">
                {item.country} {item.state}
              </p>
              <p className="mb-1 delivery-address-subtext">
                {item.address_line_1} {item.address_line_2}
              </p>
              <p className="mb-1 delivery-address-subtext">
                Pin Code: {item.pincode}
              </p>
              <p className="mb-0 delivery-address-subtext">
                Room Number: {item.roomNumber}
              </p>
            </div>
          ))
        ) : (
          <p></p>
        )}

        {/* Add New Address Button */}
        <div className="delivery-address-addnew text-center mb-5">
          <a
            style={{ cursor: "pointer" }}
            className=""
            onClick={handleCardClick}
          >
            Add a New Address
          </a>
        </div>

        <NewAddressModal
          isOpen={showModal}
          onClose={handleCloseModal}
          onConfirm={openSuccessModal}
          addressData={editingAddress} // Pass the selected address data here
        />
        <GotRequestModal
          isOpen={showSucessModal}
          onClose={() => setShowSucessModal(false)}
          onConfirm={() => setShowSucessModal(false)}
        />
      </div>
      <Row className="fixed-bottom-btn-delivery">
        <Col>
          <div className="text-center">
            <Button
              className={`btn-swipe w-100 ${styles["btn-swipe"]}`}
              block
              onClick={handleSubmitForDelivery}
            >
              Submit for Delivery
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AddressPage;
