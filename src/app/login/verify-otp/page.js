"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import logo from "../../images/snow.png";
// import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { setOtp } from "../../store/slices/signupSlice";
import axios from "axios"; // Import axios
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
  };

  const handleOtpSubmit = async () => {
    const otp = otpValues.join("");

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, {
        otp,
        email,
      });

      console.log(response.data);

      localStorage.setItem("user", JSON.stringify(response.data));
      // dispatch(setOtp(otp));

      if (response.status === 201) {
        toast.success("Login successfully");
        router.push("/");
      }
    } catch (error) {
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className="d-flex em-otp-main-container">
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
            <div className="em-otp-top-text text-center mb-4">
              <h2 className="em-otp-heading">Enter your OTP</h2>
              <p className="subtext">Verification code sent to {email}</p>
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
          <div className="d-grid mt-4">
            <button
              className="btn btn-primary em-btn-verify"
              onClick={handleOtpSubmit} // Trigger OTP verification
            >
              Verify
            </button>
          </div>
          <div className="text-center mt-2">
            <a href="/privacy-policy" className="text-muted">
              By continuing, you agree to our Privacy Policy and Terms of
              Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}