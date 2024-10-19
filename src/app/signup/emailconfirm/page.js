// pages/email-sent.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import logo from "../../images/snow.png";
// import './style.css';

export default function EmailSent() {
  return (
    <div className="d-flex em-confirm-main-container">
      <div className="em-confirm-box">
        <div className="em-confirm-box-top">
          <Image
            src={logo}
            alt="Logo"
            className="em-confirm-logo"
            width={32}
            height={32}
          />
          <h2 className="em-confirm-heading">Verify your email address</h2>
          <p className="em-confirm-text">
            We've sent you a verification link to your email. <br />
            Go to your email and click on the magic link to verify.
          </p>
        </div>
      </div>
    </div>
  );
}
