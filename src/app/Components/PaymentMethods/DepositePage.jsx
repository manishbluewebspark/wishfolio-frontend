"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./paymethod.css"; // Custom CSS file
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; // To fetch payment data from Redux
import { useRouter } from "next/navigation"; // For navigation
import axios from "axios"; // Import axios
import { updateAmount } from "../../store/slices/paymentSlice";
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const DepositPage = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(""); // Store user input amount
  const [isButtonEnabled, setIsButtonEnabled] = useState(false); // Enable/Disable button
  const paymentData = useSelector((state) => state.payment); // Assuming you have a Redux state for payment
  const router = useRouter();

  useEffect(() => {
    // Enable the button if the input has a valid amount
    setIsButtonEnabled(
      amount !== "" && !isNaN(amount) && parseFloat(amount) > 0
    );
  }, [amount]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleQuickAmountClick = (value) => {
    setAmount(value); // Set amount when clicking quick buttons
  };

  const handleContinueClick = async () => {
    // if (isButtonEnabled) {
    //   const formData = {
    //     productId: paymentData.productId,
    //     userId: paymentData.userId,
    //     amount: amount,
    //   };
    //   try {
    //     // Make API request using Axios
    //     const response = await axios.post(
    //       `${API_BASE_URL}/product/donation`,
    //       formData
    //     );
    //     if (response.status === 201) {
    //       dispatch(updateAmount(amount));
    //       router.push("/transferwithupi"); // Navigate to success page
    //     } else {
    //       console.error("Deposit failed:", response);
    //     }
    //   } catch (error) {
    //     console.error("An error occurred during the deposit:", error);
    //   }
    // }
  };

  return (
    <div className="container dp-container">
      {/* Back Button */}
      <div className="dp-header">
        <button className="dp-back-btn">← Back</button>
      </div>

      {/* Title and Description */}
      <div className="text-center mt-4">
        <h5 className="dp-title">Enter Deposit Amount</h5>
        <p className="dp-subtitle">How much would you like to deposit?</p>
      </div>

      {/* Deposit Input Box */}
      <div className="dp-input-section text-center p-4 rounded shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="dp-label">Enter Amount</span>
          <span className="dp-balance">
            Current Balance{" "}
            <strong>₹{paymentData?.balance?.toLocaleString() || 0}</strong>
          </span>
        </div>

        {/* Input Field */}
        <div className="dp-amount-box text-center">
          <span className="dp-rupee-sign">₹</span>
          <input
            type="text"
            className="dp-amount-input"
            placeholder="1,000"
            value={amount}
            onChange={handleAmountChange} // Handle input change
          />
        </div>

        {/* Predefined Buttons */}
        <div className="dp-quick-amount mt-4">
          <button
            className="dp-quick-btn"
            onClick={() => handleQuickAmountClick("1000")}
          >
            ₹1k
          </button>
          <button
            className="dp-quick-btn"
            onClick={() => handleQuickAmountClick("5000")}
          >
            ₹5k
          </button>
          <button
            className="dp-quick-btn"
            onClick={() => handleQuickAmountClick("10000")}
          >
            ₹10k
          </button>
          <button
            className="dp-quick-btn"
            onClick={() => handleQuickAmountClick("50000")}
          >
            ₹50k
          </button>
          <button
            className="dp-quick-btn"
            onClick={() => handleQuickAmountClick("100000")}
          >
            ₹100k
          </button>
        </div>
      </div>

      {/* Terms and Privacy */}
      <div className="text-center mt-3 dp-terms">
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
  );
};

export default DepositPage;
