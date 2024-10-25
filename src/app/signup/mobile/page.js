"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import logo from "../../images/snow.png";
import { useDispatch } from "react-redux";
import { setMobile } from "../../store/slices/signupSlice";
import { useRouter } from "next/navigation";
import BackButton from "../../Components/Button/BackButton";

export default function PhoneForm() {
    const router = useRouter();
    const [mobile, setMobileState] = useState("");
    const dispatch = useDispatch();

    const handleMobileSubmit = () => {
        dispatch(setMobile(mobile));
        router.push("/signup/name");
    };

    return (
        <div className="d-flex mob-em-phone-main-container">
            <div className="mob-em-back-btn">
                <BackButton />
            </div>
            <div className="mob-em-phone-container">
                <div className="mob-em-phone-box">
                    <div className="mob-em-phone-box-top">
                        <Image
                            src={logo}
                            alt="Logo"
                            className="mob-em-phone-box-logo"
                            width={32}
                            height={32}
                        />
                        <div className="mob-em-phone-top-text text-center">
                            <h2 className="mob-em-phone-heading">Enter your Phone Number</h2>
                            <p className="mob-subtext">
                                Start your wishing journey by signing up.
                            </p>
                        </div>
                    </div>
                    <div className="input-group custom-input" style={{marginBottom:'8px'}} >
                        
                        <input
                            type="text"
                            className="form-contro"
                            placeholder="+91"
                            defaultValue="+91"
                            onChange={(e) => setMobileState(e.target.value)}
		style={{
                        border: 'none', // Remove border
                        outline: 'none', // Remove default outline
                      }}
                      required
                        />
                    </div>
                    <div className="mob-terms-container-hw">
                        By continuing, you agree to our
                        <a href="/privacy-policy" className="mob-text-muted-hw">
                            {" "}Privacy Policy
                        </a>
                        and
                        <a href="/terms-of-service" className="mob-text-muted-hw">
                            {" "}Terms of Service
                        </a>
                        .
                    </div>
                    <div className="d-grid mob-em-margin-top">
                        <button
                            className="btn btn-primary mob-em-btn-continue"
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
