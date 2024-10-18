"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import logo from "../../images/snow.png";
import "./style.css";
import { setEmail } from "../../store/slices/signupSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import BackButton from "../../Components/Button/BackButton";
import { Icon } from '@iconify/react';
import envelopeIcon from '@iconify/icons-mdi/email';
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export default function LoginWithGoogle() {
  const [email, setEmailState] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleEmailSubmit = async () => {
    if (!email) {
      alert("Please enter a valid email");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/user/send-otp`, {
        email,
      });
      if (response.status === 201) {
        dispatch(setEmail(email));
        router.push("/signup/verify-otp");
      }
    } catch (error) {
      console.error("Error sending verification code:", error);
      setError("Failed to send verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    
    <div className="d-flex em-login-main-container">
      <div className="em-back-btn">
      <BackButton></BackButton>
      </div>
      <div className="em-login-container">
        <div className="em-login-box">
          <div className="em-login-box-top">
            <Image
              src={logo}
              alt="Logo"
              className="em-login-box-logo"
              width={32}
              height={32}
            />
            <div className="em-login-top-text text-center">
              <h2 className="em-login-heading">What is your email ID</h2>
              <p className="subtext">
                Start your wishing journey by signing up.
              </p>
            </div>
          </div>
          <div className="em-login-box-form">
            <div className="input-container position-relative">
            <Icon icon={envelopeIcon} width="20" className="input-icon" />
              <input
                type="email"
                className="form-control custom-input"
                placeholder="Email"
                onChange={(e) => setEmailState(e.target.value)}
              />
            </div>
          </div>
          <div className="terms-container-hw">
  By continuing, you agree to our 
  <a href="/privacy-policy" className="text-muted-hw">Privacy Policy</a> 
  and 
  <a href="/terms-of-service" className="text-muted-hw">Terms of Service</a>.
</div>

          <div className="d-grid em-login-margin">
            <button
              className="btn btn-primary em-btn-login"
              onClick={handleEmailSubmit}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Sending..." : "Get Verification Code"}
            </button>
          </div>
          {error && (
            <div className="text-danger mt-3 text-center">
              {error} {/* Show error message */}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
