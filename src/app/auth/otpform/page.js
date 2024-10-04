// pages/otp.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import logo from '../../images/snow.png'
import "./style.css"
export default function OtpForm() {
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
              <h2 className="em-otp-heading">Enter your email ID</h2>
              <p className="subtext">Start your wishing journey by signing up.</p>
              <p className="subtext">Verification code sent to Sinan@gmail.com</p>
            </div>
          </div>
          <div className="em-otp-input-container d-flex ">
            <input type="text" className="otp-input" maxLength="1" />
            <input type="text" className="otp-input" maxLength="1" />
            <input type="text" className="otp-input" maxLength="1" />
            <input type="text" className="otp-input" maxLength="1" />
          </div>
          <div className="d-grid mt-4">
            <button className="btn btn-primary em-btn-verify">
              Verify
            </button>
          </div>
          <div className="text-center mt-2">
            <a href="/privacy-policy" className="text-muted">
              By continuing, you agree to our Privacy Policy and Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
