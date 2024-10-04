// pages/fullname.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import logo  from '../../images/snow.png';
import "./style.css"


export default function FullNameForm() {
  return (
    <div className="d-flex em-fullname-main-container">
      <div className="em-fullname-container">
        <div className="em-fullname-box">
          <div className="em-fullname-box-top">
            <Image
              src={logo}
              alt="Logo"
              className="em-fullname-box-logo"
              width={32}
              height={32}
            />
            <div className="em-fullname-top-text text-center">
              <h2 className="em-fullname-heading">Enter your Full Name</h2>
              <p className="subtext">Start your wishing journey by signing up.</p>
            </div>
          </div>
          <div className="input-container">
            <i className="fa fa-user input-icon"></i>
            <input
              type="text"
              className="form-control custom-input"
              placeholder="John Doe"
            />
          </div>
          <div className="d-grid mt-4">
            <button className="btn btn-primary em-btn-continue">
              Continue
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
