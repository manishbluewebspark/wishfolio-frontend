"use client"; // This is required to use client-side rendering with App Router

import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import "./payMethod.css"; // Custom CSS file
import arrowright from "../../images/arrow-right.png"; // Correct path to arrow-right image
import bank from "../../images/bank.png"; // Correct path to bank image
import bhimupi from "../../images/bhimupi.png"; // Correct path to bhim image
import googleupi from "../../images/googleupi.png"; // Correct path to google pay image
import paytmupi from "../../images/paytmupi.png"; // Correct path to paytm image
import phoneupi from "../../images/phoneupi.png"; // Correct path to phonepe image (note corrected extension)
import arrowleftIcon from "../../images/arrow-left.png";
import { useRouter } from "next/navigation";
const PaymentMethod = () => {
  const router = useRouter();
  const handleDonateClick = () => {
    router.push("/deposit");
  };
  return (
    <>
      <div className="container pt-3">
        <div className="">
          <button className="dp-back-btn">
            <Image
              src={arrowleftIcon}
              width={24}
              height={24}
              alt="Arrow Left Icon"
              className="mx-2"
            />
            Back
          </button>
        </div>
        <div className="container ptm-container">
          <h5 className="ptm-title">Choose Payment Method</h5>
          <div className="ptm-payment-options">
            {/* Payment Method 1 */}
            <div className="ptm-payment-method d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <Image
                  src={bank}
                  alt="Bank Transfer"
                  className="ptm-icon"
                  width={119}
                  height={24}
                />
              </div>
              <Image
                onClick={handleDonateClick}
                src={arrowright}
                alt="Arrow Right"
                className="ptm-arrow"
                width={20}
                height={20}
              />
            </div>

            {/* Payment Method 2 */}
            <div className="ptm-payment-method d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <Image
                  src={googleupi}
                  alt="Google Pay"
                  className="ptm-icon"
                  width={150}
                  height={27.19}
                />
              </div>
              <Image
                onClick={handleDonateClick}
                src={arrowright}
                alt="Arrow Right"
                className="ptm-arrow"
                width={20}
                height={20}
              />
            </div>

            {/* Payment Method 3 */}
            <div className="ptm-payment-method d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <Image
                  src={phoneupi}
                  alt="PhonePe"
                  className="ptm-icon"
                  width={114}
                  height={32}
                />
              </div>
              <Image
                onClick={handleDonateClick}
                src={arrowright}
                alt="Arrow Right"
                className="ptm-arrow"
                width={20}
                height={20}
              />
            </div>

            {/* Payment Method 4 */}
            <div className="ptm-payment-method d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <Image
                  src={paytmupi}
                  alt="Paytm"
                  className="ptm-icon"
                  width={72}
                  height={23}
                />
              </div>
              <Image
                onClick={handleDonateClick}
                src={arrowright}
                alt="Arrow Right"
                className="ptm-arrow"
                width={20}
                height={20}
              />
            </div>

            {/* Payment Method 5 */}
            <div className="ptm-payment-method d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <Image
                  src={bhimupi}
                  alt="BHIM"
                  className="ptm-icon"
                  width={100}
                  height={24}
                />
              </div>
              <Image
                onClick={handleDonateClick}
                src={arrowright}
                alt="Arrow Right"
                className="ptm-arrow"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
