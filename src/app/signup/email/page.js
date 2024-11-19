"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import logo from "../../images/Snow.svg";
// import "./style.css";
import { setEmail } from "../../store/slices/signupSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import BackButton from "../../Components/Button/BackButton";
import { Icon } from "@iconify/react";
import envelopeIcon from "@iconify/icons-mdi/email";
import emailicon from "../../images/emailicon.svg";

import { toast } from "react-toastify";
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
      console.error("Error sending verification code:");
    } catch (error) {
      console.error("Error sending verification code:", error);
      //setError("Failed to send verification code. Please try again.");
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex signup-login-main-container">
        <div className="signup-back-btn">
          <BackButton></BackButton>
        </div>
        <div className="signup-login-container">
          <div className="signup-login-box">
            <div className="signup-login-box-top">
              <Image
                src={logo}
                alt="Logo"
                className="signup-login-box-logo"
                width={32}
                height={32}
              />
              <div className="signup-login-top-text text-center">
                <h2 className="signup-login-heading">What is your email ID</h2>
                <p className="signup-subtext">
                  Start your wishing journey by signing up.
                </p>
              </div>
            </div>
            <div
              className="input-group custom-input"
              style={{ marginBottom: "8px" }}
            >
              <span className="input-group-text login-input-group-text">
                <Image
                  src={emailicon}
                  alt="Email Icon"
                  width={24}
                  height={24}
                />
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmailState(e.target.value)}
                style={{
                  border: "none", // Remove border
                  outline: "none", // Remove default outline
                }}
                required
              />
            </div>

            <div className="signup-terms-container-hw">
              By continuing, you agree to our
              <a href="/privacy-policy" className="signup-text-muted-hw">
                Privacy Policy
              </a>
              and
              <a href="/termsandconditions" className="signup-text-muted-hw">
                Terms of Service
              </a>
              .
            </div>

            <div className="d-grid signup-login-margin">
              <button
                className="signup-btn-login"
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
