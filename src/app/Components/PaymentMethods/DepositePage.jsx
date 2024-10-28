"use client";

import "bootstrap/dist/css/bootstrap.min.css";
// import "./paymethod.css"; // Custom CSS file
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; // To fetch payment data from Redux
import { useRouter } from "next/navigation"; // For navigation
import axios from "axios"; // Import axios
import arrowleftIcon from "../../images/arrow-left.png";
import {
  updateAmount,
  updateTransactionId,
} from "../../store/slices/paymentSlice";
import { fetchUserData } from "../../store/slices/userSlice";
import Image from "next/image";
import BackButton from "../Button/BackButton";
import CurrencyName from "../Comman/CurrencyName";
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const DepositPage = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(""); // Store user input amount
  const [isButtonEnabled, setIsButtonEnabled] = useState(false); // Enable/Disable button
  const paymentData = useSelector((state) => state.payment); // Assuming you have a Redux state for payment
  const router = useRouter();
  const handleBackClick = () => {
    router.push("/paymentmethodpage");
  };
  useEffect(() => {
    // Enable the button if the input has a valid amount
    setIsButtonEnabled(
      amount !== "" && !isNaN(amount) && parseFloat(amount) > 0
    );
  }, [amount]);
  const { userData, isLoading, error } = useSelector((state) => state.user);
  useEffect(() => {
    const getUserData = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const uData = JSON.parse(userData);
        dispatch(fetchUserData(uData.id));
      }
    };

    getUserData(); // Call the function
  }, []);
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleQuickAmountClick = (value) => {
    setAmount(value); // Set amount when clicking quick buttons
  };
  const generateTransactionId = () => {
    const min = 10000000000000; // Minimum 14-digit number
    const max = 99999999999999; // Maximum 14-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const handleContinueClick = async () => {
    if (isButtonEnabled) {
      const formData = {
        transactionId: generateTransactionId(),
        userId: userData._id,
        amount: amount,
      };
      dispatch(updateAmount(amount));
      dispatch(updateTransactionId(formData.transactionId));
      router.push("/transferamount");
      // try {
      //   // Make API request using Axios
      //   const response = await axios.post(
      //     `${API_BASE_URL}/user/deposit`,
      //     formData
      //   );
      //   if (response.status === 201) {
      //     dispatch(updateAmount(amount));
      //     dispatch(updateTransactionId(formData.transactionId));

      //     router.push("/transferamount"); // Navigate to success page
      //   } else {
      //     console.error("Deposit failed:", response);
      //   }
      // } catch (error) {
      //   console.error("An error occurred during the deposit:", error);
      // }
    }
  };

  return (
    <>
    {/* Back Button */}
      <BackButton title={"Back"}></BackButton>
      <div className="container dp-container">
        {/* Title and Description */}
        <div className="text-center">
          <h5 className="dp-title">Enter Deposit Amount</h5>
          <p className="dp-subtitle">How much would you like to deposit?</p>
        </div>

        {/* Deposit Input Box */}
        <div className="dp-input-section text-center">
          <div className="d-flex justify-content-between align-items-center dp-enter-amt">
            <span className="dp-label">Enter Amount</span>
            <span className="dp-balance">
              Current Balance{" "}
              <strong>
                <CurrencyName />
                {paymentData?.balance?.toLocaleString() || 0}
              </strong>
            </span>
          </div>

          {/* Input Field */}
          <div className="dp-amount-box text-center">
            <span className="dp-rupee-sign">
              <CurrencyName />
            </span>
            <input
              type="text"
              className="dp-amount-input"
              placeholder="1,000"
              value={amount}
              onChange={handleAmountChange} // Handle input change
            />
          </div>

          {/* Predefined Buttons */}
          <div className="dp-quick-amount">
            <button
              className="dp-quick-btn"
              onClick={() => handleQuickAmountClick("1000")}
            >
              <CurrencyName />
              1k
            </button>
            <button
              className="dp-quick-btn"
              onClick={() => handleQuickAmountClick("5000")}
            >
              <CurrencyName />
              5k
            </button>
            <button
              className="dp-quick-btn"
              onClick={() => handleQuickAmountClick("10000")}
            >
              <CurrencyName />
              10k
            </button>
            <button
              className="dp-quick-btn"
              onClick={() => handleQuickAmountClick("50000")}
            >
              <CurrencyName />
              50k
            </button>
            <button
              className="dp-quick-btn"
              onClick={() => handleQuickAmountClick("100000")}
            >
              <CurrencyName />
              100k
            </button>
          </div>
        </div>

        {/* Terms and Privacy */}
        <div className="text-center dp-terms">
          By continuing, you agree to our <a href="#">Privacy Policy</a> and{" "}
          <a href="#">Terms of Service</a>
        </div>

        {/* Continue Button */}
        <div className={`dp-continue-btn-wrapper mt-4 `}>
          <button
            className={`dp-continue-btn ${
              isButtonEnabled ? "dp-continue-btn-active" : ""
            }`}
            onClick={handleContinueClick}
            disabled={!isButtonEnabled} // Disable button if no amount is entered
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default DepositPage;
