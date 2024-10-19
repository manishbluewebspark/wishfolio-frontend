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

export default function FullNameForm() {
  const router = useRouter();
  const [name, setNameState] = useState("");
  const dispatch = useDispatch();

  const handleMobileSubmit = () => {
    dispatch(setName(name));
    router.push("/signup/address");
  };
  return (
    <div className="d-flex em-fullname-main-container">
      <div className="em-back-btn">
        <BackButton></BackButton>
      </div>
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
              <p className="subtext">
                Start your wishing journey by signing up.
              </p>
            </div>
          </div>
          <div className="input-container position-relative ">
            <i className="fa fa-user input-icon"></i>
            <Icon icon={userIcon} width="20" className="input-icon" />
            <input
              type="text"
              className="form-control custom-input"
              placeholder="John Doe"
              onChange={(e) => setNameState(e.target.value)}
            />
          </div>
          <div className="terms-container-hw">
            By continuing, you agree to our
            <a href="/privacy-policy" className="text-muted-hw">
              {" "}
              Privacy Policy
            </a>
            and
            <a href="/terms-of-service" className="text-muted-hw">
              {" "}
              Terms of Service
            </a>
            .
          </div>
          <div className="d-grid em-margin-top">
            <button
              className="btn btn-primary em-btn-continue"
              onClick={handleMobileSubmit}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
