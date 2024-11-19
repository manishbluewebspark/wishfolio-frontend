"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import logo from "../../images/snow.png";
// import "./style.css";
import { useDispatch } from "react-redux";
import { setName } from "../../store/slices/signupSlice";
import { useRouter } from "next/navigation";
import BackButton from "../../Components/Button/BackButton";
import { Icon } from "@iconify/react";
import userIcon from "@iconify/icons-mdi/user";
import usericon from "../../images/frame.svg";

export default function NameForm() {
  const router = useRouter();
  const [name, setNameState] = useState("");
  const dispatch = useDispatch();

  const handleMobileSubmit = () => {
    dispatch(setName(name));
    router.push("/signup/address");
  };

  return (
    <div className="d-flex em-name-main-container">
      <div className="em-back-btn">
        <BackButton></BackButton>
      </div>
      <div className="em-name-container">
        <div className="em-name-box">
          <div className="em-name-box-top">
            <Image
              src={logo}
              alt="Logo"
              className="em-name-box-logo"
              width={32}
              height={32}
            />
            <div className="em-name-top-text text-center">
              <h2 className="em-name-heading">Enter your Name</h2>
              <p className="em-name-subtext">
                Start your wishing journey by signing up.
              </p>
            </div>
          </div>
          <div
            className="input-group custom-input"
            style={{ marginBottom: "8px" }}
          >
            <span className="input-group-text login-input-group-text">
              <Image src={usericon} alt="Email Icon" width={24} height={24} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="John Doe"
              onChange={(e) => setNameState(e.target.value)}
              style={{
                border: "none", // Remove border
                outline: "none", // Remove default outline
              }}
              required
            />
          </div>
          <div className="terms-container-hw">
            By continuing, you agree to our
            <a href="/privacy-policy" className="text-muted-hw">
              {" "}
              Privacy Policy
            </a>
            and
            <a href="/termsandconditions" className="text-muted-hw">
              {" "}
              Terms of Service
            </a>
            .
          </div>
          <div className="d-grid em-margin-top">
            <button className="em-btn-continue" onClick={handleMobileSubmit}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
