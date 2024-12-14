"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import logo from "../../images/snow.png";
import { useDispatch, useSelector } from "react-redux";
import { setOtp } from "../../store/slices/signupSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import BackButton from "../../Components/Button/BackButton";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function OtpForm() {
  const router = useRouter();
  const [otpValues, setOtpValues] = useState(["", "", "", ""]); // State for OTP inputs
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.signup);

  const handleInputChange = (index, value) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value; // Update the specific OTP input
    setOtpValues(newOtpValues);

    // Move to the next input if the value is filled and it's not the last input
    if (value && index < otpValues.length - 1) {
      document.getElementsByClassName("otp-input")[index + 1].focus();
    }
  };

  const handleOtpSubmit = async () => {
    const otp = otpValues.join("");

    try {
      const response = await axios.post(`${API_BASE_URL}/user/verify-otp`, {
        otp,
        email,
      });
      console.log("API Response:", response.data);
      dispatch(setOtp(otp));

      if (response.status === 201) {
        toast.success("OTP verified successfully!");
        router.push("/signup/mobile");
      }
    } catch (error) {
      toast.error("Invalid OTP");
    }
  };

  // Check if all OTP inputs are filled
  const isButtonDisabled = otpValues.some((value) => value === "");

  return (
    <div className="d-flex em-otp-main-container">
      <div className="em-back-btn">
        <BackButton></BackButton>
      </div>
      <div className="em-otp-container">
        <div className="em-otp-box">
          <div className="em-otp-box-top">
            <Image
              src={logo}
              alt="Logo"
              className="em-otp-box-logo"
              width={32}
              height={32}
            />
            <div className="em-otp-top-text text-center">
              <h2 className="em-otp-heading">Enter your OTP</h2>
              <p className="subtext">Verification code sent to {email}</p>
              <p className="em-otp-desc">
                Start your wishing journey by signing up.
              </p>
            </div>
          </div>
          <div className="em-otp-input-container d-flex">
            {otpValues.map((value, index) => (
              <input
                key={index}
                type="text"
                className="otp-input"
                maxLength="1"
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onFocus={(e) => e.target.select()} // Optional: Select input on focus
                onKeyUp={(e) => {
                  if (e.key === "Backspace" && index > 0 && value === "") {
                    // Move focus to the previous input if current is empty and backspace is pressed
                    document
                      .getElementsByClassName("otp-input")
                      [index - 1].focus();
                  }
                }}
              />
            ))}
          </div>

          <div className="otp-terms-container-hw">
            By continuing, you agree to our
            <a href="/privacy-policy" className="text-muted-hw">
              Privacy Policy
            </a>
            and
            <a href="/termsandconditions" className="text-muted-hw">
              Terms of Service
            </a>
            .
          </div>
          <div className="d-grid otp-margin">
            <button
              className={`em-btn-verify ${isButtonDisabled ? "disabled" : ""}`}
              onClick={handleOtpSubmit} // Trigger OTP verification
              disabled={isButtonDisabled} // Disable button if not all inputs are filled
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
