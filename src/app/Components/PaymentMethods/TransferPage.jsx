"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { Icon } from "@iconify/react";
import arrowleftIcon from "../../images/arrow-left.png";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation"; // Import useRouter and useParams
import axios from "axios";
import Image from "next/image";
import { useSelector } from "react-redux";
import clipboardIcon from "../../images/copy.png";
import BackButton from "../Button/BackButton";
import CurrencyName from "../Comman/CurrencyName";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const TransferPage = () => {
  const router = useRouter(); // Initialize the router
  const params = useParams(); // Get params from the URL
  const paymentData = useSelector((state) => state.payment); // Use Redux state for payment data if needed

  const [paymentDetails, setPaymentDetails] = useState(null); // Store fetched payment details
  const [loading, setLoading] = useState(true); // Loading state for API call
  const [error, setError] = useState(null); // Error state for API call

  const fees = 15; // Fee percentage

  // Function to fetch payment details using param.id
  const fetchPaymentDetails = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/payment-method/${params.id}`
      );
      setPaymentDetails(response.data); // Set the fetched payment details
      setLoading(false); // Set loading to false once data is fetched
    } catch (err) {
      setError(err.message); // Set error message if API call fails
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchPaymentDetails(); // Fetch payment details on component mount
    }
  }, [params.id]); // Re-run if params.id changes

  // Assuming paymentDetails has an amount property
  const paymentAmount = paymentData?.amount || 0;
  const deductedAmount = paymentAmount - paymentAmount * (fees / 100);

  // Handle Back button click
  const handleBackButtonClick = () => {
    router.push("/profile"); // Navigate to the previous page
  };

  if (loading) {
    return <div>Loading payment details...</div>;
  }

  if (error) {
    return <div>Error fetching payment details: {error}</div>;
  }
  console.log("paymentDetails========", paymentDetails);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(field);
      setTimeout(() => setCopied(null), 1000); // Hide message after 1 second
    });
  };

  return (
    <>
      <BackButton title={"Back"} customeRoute="/predeposit" />
      <div className="ta-dp-container">
        <div className="ta-dp-input-section">
          <p className="ta-dp-title">
            You can transfer the money to the bank account below and submit your
            transaction ID.
          </p>

          {/* Payment Provider */}
          <div className="twu-section-row">
            <div>
              <div className="twu-label">Payment Provider</div>
              <div className="twu-balance">{paymentDetails?.provider}</div>
            </div>
            <Image
              src={clipboardIcon}
              height={20}
              width={20}
              alt="copyicon"
            ></Image>
          </div>

          {paymentDetails?.inputs.map((item, index) => (
            <div className="twu-section-row" key={index}>
              <div>
                <div className="twu-label">{item.label}</div>
                <div className="twu-balance">{item.value}</div>
              </div>
              <Image
                src={clipboardIcon}
                height={20}
                width={20}
                alt="copyicon"
              />
            </div>
          ))}
            <div>
              <span
                className="d-flex align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => handleCopy("TRUETRADER APP PRIVATE LIMITED", "Account Name")}
              >
                <Image
                  src={clipboardIcon}
                  height={20}
                  width={20}
                  alt="copyicon"
                />
                {copied === "Account Name" && <span>Copied</span>}
              </span>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <div className="ta-dp-label">Account Number</div>
              <div className="ta-dp-balance">16900200006420</div>
            </div>
            <div>
              <span
                className="d-flex align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => handleCopy("16900200006420", "Account Number")}
              >
                <Image
                  src={clipboardIcon}
                  height={20}
                  width={20}
                  alt="copyicon"
                />
                {copied === "Account Number" && <span>Copied</span>}
              </span>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span className="ta-dp-label">IFSC</span>
              <span
                className="d-flex align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => handleCopy("FDRL0001690", "IFSC")}
              >
                <span className="ta-dp-balance">FDRL0001690</span>
                <Image
                  src={clipboardIcon}
                  height={20}
                  width={20}
                  alt="copyicon"
                />
                {copied === "IFSC" && <span>Copied</span>}
              </span>
            </div>
            <div>
              <span className="ta-dp-label">Bank Name</span>
              <span
                className="d-flex align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => handleCopy("Federal Bank", "Bank Name")}
              >
                <span className="ta-dp-balance">Federal Bank</span>
                <Image
                  src={clipboardIcon}
                  height={20}
                  width={20}
                  alt="copyicon"
                />
                {copied === "Bank Name" && <span>Copied</span>}
              </span>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span className="ta-dp-label">Branch</span>
              <span
                className="d-flex align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => handleCopy("Kolathur", "Branch")}
              >
                <span className="ta-dp-balance">Kolathur</span>
                <Image
                  src={clipboardIcon}
                  height={20}
                  width={20}
                  alt="copyicon"
                />
                {copied === "Branch" && <span>Copied</span>}
              </span>
            </div>
            <div>
              <span className="ta-dp-label">SWIFT Code</span>
              <span
                className="d-flex align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => handleCopy("FDRLINBBIBD", "SWIFT Code")}
              >
                <span className="ta-dp-balance">FDRLINBBIBD</span>
                <Image
                  src={clipboardIcon}
                  height={20}
                  width={20}
                  alt="copyicon"
                />
                {copied === "SWIFT Code" && <span>Copied</span>}
              </span>
            </div>
          </div>
        </div>

        {/* Amount and Commission Section */}
        <div className="ta-dp-amount-section">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="ta-dp-label">Transferring Amount</span>
            <span className="ta-dp-balance">
              <CurrencyName /> {paymentAmount.toLocaleString()}
            </span>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="ta-dp-label">Platform Commission {fees}%</span>
            <span className="ta-dp-balance">
              <CurrencyName /> {(paymentAmount * (fees / 100)).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Total to Receive */}
        <div className="ta-dp-input-section-btm">
          <span className="ta-dp-final-amount">You Will Receive</span>
          <span className="ta-dp-final-amount-value">
            <CurrencyName /> {deductedAmount.toLocaleString()}
          </span>
        </div>
    </>
  );
};

export default TransferPage;
