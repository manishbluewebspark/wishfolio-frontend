"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import logo from "../../images/snow.png";
import "./style.css";
import { useDispatch } from "react-redux";
import { setMobile } from "../../store/slices/signupSlice";
import { useRouter } from "next/navigation";

export default function PhoneForm() {
  const router = useRouter();
  const [mobile, setMobileState] = useState("");
  const dispatch = useDispatch();

  const handleMobileSubmit = () => {
    dispatch(setMobile(mobile));
    router.push("/signup/name");
  };
  return (
    <div className="d-flex em-phone-main-container">
      <div className="em-phone-container">
        <div className="em-phone-box">
          <div className="em-phone-box-top">
            <Image
              src={logo}
              alt="Logo"
              className="em-phone-box-logo"
              width={32}
              height={32}
            />
            <div className="em-phone-top-text text-center">
              <h2 className="em-phone-heading">Enter your Phone Number</h2>
              <p className="subtext">
                Start your wishing journey by signing up.
              </p>
            </div>
          </div>
          <div className="input-container">
            <i className="fa fa-phone input-icon"></i>
            <input
              type="text"
              className="form-control custom-input"
              placeholder="+91"
              defaultValue="+91"
              onChange={(e) => setMobileState(e.target.value)}
            />
          </div>
          <div className="d-grid mt-4">
            <button
              className="btn btn-primary em-btn-continue"
              onClick={handleMobileSubmit}
            >
              Continue
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