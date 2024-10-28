"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation"; // Import useRouter
import arrowleftIcon from "../../images/arrow-left.png";
import Image from "next/image";
import { useSelector } from "react-redux";
import clipboardIcon from "../../images/copy.png";
import BackButton from "../Button/BackButton";
import CurrencyName from "../Comman/CurrencyName";
const TransferPage = () => {
  const router = useRouter(); // Initialize the router

  const handleBackButtonClick = () => {
    router.push("/profile"); // Navigate to the previous page
  };

  const fees = 5; // fee percentage
  const paymentData = useSelector((state) => state.payment);

  // Assuming paymentData has an amount property
  const paymentAmount = paymentData.amount;
  const deductedAmount = paymentAmount - paymentAmount * (fees / 100);

  return (
    <>
      {/* Back Button */}
      <BackButton title={"Back"} customeRoute="/predeposit"></BackButton>
      <div className="ta-dp-container">
        {/* Bank Details Section */}
        <div className="ta-dp-input-section">
          <p className="ta-dp-title">
            You can transfer the money to the bank account below and submit your
            transaction ID. {paymentData?.transactionId}
          </p>

          {/* Account Information */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <div className="ta-dp-label">Account Name</div>
              <div className="ta-dp-balance">
                TRUETRADER APP PRIVATE LIMITED
              </div>
            </div>
            <div>
              <span className="d-flex align-items-center">
                <Image
                  src={clipboardIcon}
                  height={20}
                  width={20}
                  alt="copyicon"
                ></Image>
              </span>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <div className="ta-dp-label">Account Number</div>
              <div className="ta-dp-balance">16900200006420</div>
            </div>
            <div>
              <span className="d-flex align-items-center">
                <Image
                  src={clipboardIcon}
                  height={20}
                  width={20}
                  alt="copyicon"
                ></Image>
              </span>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span className="ta-dp-label">IFSC</span>
              <span className="d-flex align-items-center">
                <span className="ta-dp-balance">FDRL0001690</span>
                <Image
                  src={clipboardIcon}
                  height={20}
                  width={20}
                  alt="copyicon"
                ></Image>
              </span>
            </div>
            <div>
              <span className="ta-dp-label">Bank Name</span>
              <span className="d-flex align-items-center">
                <span className="ta-dp-balance">Federal Bank</span>
                <Image
                  src={clipboardIcon}
                  height={20}
                  width={20}
                  alt="copyicon"
                ></Image>
              </span>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span className="ta-dp-label">Branch</span>
              <span className="d-flex align-items-center">
                <span className="ta-dp-balance">Kolathur</span>
                <Image
                  src={clipboardIcon}
                  height={20}
                  width={20}
                  alt="copyicon"
                ></Image>
              </span>
            </div>
            <div>
              <span className="ta-dp-label">SWIFT Code</span>
              <span className="d-flex align-items-center">
                <span className="ta-dp-balance">FDRLINBBIBD</span>
                <Image
                  src={clipboardIcon}
                  height={20}
                  width={20}
                  alt="copyicon"
                ></Image>
              </span>
            </div>
          </div>
        </div>

        {/* Amount and Commission Section */}
        <div className="ta-dp-amount-section shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="ta-dp-label">Transferring Amount</span>
            <span className="ta-dp-balance">
              <CurrencyName /> {paymentData?.amount}
            </span>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="ta-dp-label">Platform Commission {fees}%</span>
            <span className="ta-dp-balance">
              <CurrencyName /> {paymentAmount * (fees / 100)}
            </span>
          </div>
        </div>

        {/* Total to Receive */}
        <div className="ta-dp-input-section-btm">
          <span className="ta-dp-final-amount">You Will Receive</span>
          <span className="ta-dp-final-amount-value">
            <CurrencyName /> {deductedAmount}
          </span>
        </div>
      </div>
    </>
  );
};

export default TransferPage;
