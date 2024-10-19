"use client";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import logo from "../../images/snow.png"; // Replace with your logo path
// import './style.css';
import { Icon } from "@iconify/react";
import envelopeIcon from "@iconify/icons-mdi/email-outline"; // Correct envelope icon from Iconify

const VerifyEmailForm = () => {
  const [email, setEmail] = useState("");

  const handleEmailVerify = (e) => {
    e.preventDefault();
    // Add logic to verify the email
    alert(`Verification email sent to ${email}`);
  };

  return (
    <div className="d-flex em-verify-main-container">
      <div className="em-verify-container">
        <div className="em-verify-box">
          <div className="em-verify-box-top">
            <Image
              src={logo}
              alt="Logo"
              className="em-verify-box-logo"
              width={32}
              height={32}
            />
            <div className="em-verify-top-text text-center">
              <h2 className="em-verify-heading">Verify your email address</h2>
              <p className="subtext">Enter your email ID below to verify.</p>
            </div>
          </div>

          {/* Input field for email */}
          <form onSubmit={handleEmailVerify}>
            <div className="input-container position-relative">
              <Icon icon={envelopeIcon} width="20" className="input-icon" />
              <input
                type="email"
                className="form-control custom-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Verify button */}
            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-primary em-btn-verify">
                Verify Email Address
              </button>
            </div>
          </form>

          {/* Policy and terms */}
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
};

export default VerifyEmailForm;
