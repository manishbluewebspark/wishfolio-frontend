// pages/login.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import logo from '../../images/snow.png'
import './style.css';

export default function LoginWithGoogle() {
  return (
    <div className="d-flex em-login-main-container">
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
              <p className="subtext">Start your wishing journey by signing up.</p>
            </div>
          </div>
          <div className="em-login-box-form">
            <div className="input-container">
              <i className="fa fa-envelope input-icon"></i>
              <input
                type="email"
                className="form-control custom-input"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="d-grid mt-4">
            <button className="btn btn-primary em-btn-login">
              Get Verification Code
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
