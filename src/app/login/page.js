"use client"; // Ensure this is the first line

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // For client-side navigation
import { loginUser } from "../store/slices/authSlice"; // Import the login thunk from authSlice
import logoIcon from "../images/snow.png"; // Replace with your logo
import "./style.css";
import { Icon } from '@iconify/react';
import envelopeIcon from '@iconify/icons-mdi/email';
import lockIcon from "@iconify/icons-mdi/lock";
import googleIcon from '../images/googleIcon.png';
import Image from "next/image";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const { token, isLoading, error } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((userData) => {
        // Redirect to home page after successful login
        localStorage.setItem("user", JSON.stringify(userData));
        router.push("/");
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };
  const handleCreateAccount = () => {
    router.push("/signup/email");
  };
  return (
    <>
    <div className="login-main-container">
      <div className="login-container">
        <div className="login-box text-center">
          {/* Logo */}
          <div className="login-box-top">
            <div className="login-box-logo">
              <Image
                src={logoIcon}
                alt="Logo"
                className="logo-img"
                width={32}
                height={32}
              />
            </div>

            {/* Heading */}
            <div className="login-top-text">
              <p className="login-heading">Sign in with Email</p>
              <p className="subtext">
                Welcome back! Login to your wishing journey.
              </p>
            </div>
          </div>

          {/* Login Form */}
          <div className="login-box-from">
            <form onSubmit={handleLogin}>
              <div
                className="position-relative"
                style={{ marginBottom: "8px" }}
              >
                <div className="input-group">
                  <span className="input-group-text input-icon">
                    <Icon icon={envelopeIcon} width="20" />
                  </span>
                  <input
                    type="email"
                    className="form-control custom-input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ borderRadius: "50px" }}
                    required
                  />
                </div>
              </div>

              {/* <div
                className="position-relative"
                style={{ marginBottom: "8px" }}
              >
                <div className="input-group">
                  <span className="input-group-text input-icon">
                    <Icon icon={lockIcon} width="20" />
                  </span>
                  <input
                    type="password"
                    className="form-control custom-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ borderRadius: "50px" }}
                  />
                </div>
                <a href="#" className="forgot-password">
                  Forgot?
                </a>
              </div> */}

              {/* Error Message */}
              {error && <p style={{ color: "red" }}>{error}</p>}

              {/* Login Button */}
              <button
                type="submit"
                className="btn btn-primary btn-login w-100"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>

          {/* Divider */}
          <div className="my-2 or-txt">Or</div>

          {/* Google Sign-in Button */}
          <div className="login-box-btm">
            <button
              className="btn btn-light btn-google w-100 mb-3"
              onClick={() => handleCreateAccount()}
            >
              <Image src={googleIcon} height={24} width={24} alt='socialIcon' className="social-icon"></Image>
              Sign up with Google
            </button>
          </div>
        </div>

        {/* Create New Account */}
        <div className="create-new-con">
          {/* <div className="create-account">
            <a href="#" onClick={() => handleCreateAccount()}>
              <i className="bi bi-arrow-right-circle"></i> Create a new account
            </a>
          </div> */}
          <button
            className="btn btn-light btn-google w-100 mb-3"
            onClick={() => handleCreateAccount()}
          >
            <i className="bi bi-google"></i> Create a new account
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginScreen;
