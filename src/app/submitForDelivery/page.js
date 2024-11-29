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
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(false); // New state to handle double submission prevention

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

  const handleAddressSelect = (addressId, type) => {
    setSelectedAddressId(addressId);
    setSelectedAddressType(type);
  };

  const handleSubmitForDelivery = async () => {
    if (!selectedAddressId) {
      alert("Please select an address for delivery.");
      return;
    }

    const productId = wishData?.data?.productId;
    const wishId = wishData?.data?._id;

    try {
      setLoading(true); // Prevent double submission
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/delivery`,
        {
          addressId: selectedAddressId,
          productId: productId,
          addressType: selectedAddressType,
          userId: userData?._id,
          wishId: wishId,
        }
      );
      toast.success(response.data.message);
      setShowSucessModal(true);

      setTimeout(() => {
        router.push("/levelup");
      }, 5000);
    } catch (error) {
      console.error("Error submitting for delivery:", error);
      toast.error("An error occurred while submitting for delivery.");
    } finally {
      setLoading(false); // Re-enable button
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setShowModal(true);
  };

  return (
    <>
      <BackButton title={"Address"} />
      <div className={`container newClassForaddress ${styles.container} h-100`}>
        {/* User's Main Address Card */}
        <div
          className={`card delivery-address-con  ${styles.card} ${
            selectedAddressId === userData?._id ? styles.activeAddress : ""
          }`}
          onClick={() => handleAddressSelect(userData?._id, "main")}
        >
          <div className="d-flex justify-content-between">
            <h6 className="delivery-address-text-head">Address Line 1</h6>
            <Button
              variant="text"
              className="p-0 edit-button-address"
              onClick={() => handleEditAddress(userData)}
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
              }`}
              onClick={() => handleAddressSelect(item._id, "other")}
            >
              <div className="d-flex justify-content-between">
                <h6 className="delivery-address-text-head">
                  Address {index + 2}
                </h6>
                <Button
                  variant="text"
                  className="p-0 edit-button-address"
                  onClick={() => handleEditAddress(item)}
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
          <p>No additional addresses found.</p>
        )}

        {/* Add New Address Button */}
        <div className="delivery-address-addnew text-center mb-5">
          <a style={{ cursor: "pointer" }} onClick={handleCardClick}>
            Add a New Address
          </a>
        </div>

        <NewAddressModal
          isOpen={showModal}
          onClose={handleCloseModal}
          onConfirm={openSuccessModal}
          addressData={editingAddress}
        />
        <GotRequestModal
          isOpen={showSucessModal}
          onClose={() => setShowSucessModal(false)}
          onConfirm={() => setShowSucessModal(false)}
        />
      </div>
      <Row className="fixed-bottom-btn-delivery">
        <Col>
          <div className="text-center" style={{ margin: "0px 10px" }}>
            {selectedAddressId ? (
              <Button
                className={`btn-swipe w-100`}
                onClick={handleSubmitForDelivery}
                disabled={loading} // Disable button if loading
              >
                {loading ? "Processing..." : "Deliver to this address"}
              </Button>
            ) : (
              <Button className={`submit-for-disabledbtn w-100`} disabled>
                Deliver to this address
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AddressPage;
