'use client';
import { useState } from "react";
import Image from "next/image";
import logoIcon from "../images/snow.png"; // Replace with your logo
import "./style.css";
import { Icon } from '@iconify/react';
import envelopeIcon from '@iconify/icons-mdi/envelope';
import lockIcon from '@iconify/icons-mdi/lock';


const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <div className="login-main-container"> 
      <div className="login-container d-block justify-content-center align-items-center">
      <div className="login-box text-center">
        {/* Logo */}
        <div className="login-box-top">
          <div className="login-box-logo">
          <Image src={logoIcon} alt="Logo" className="logo-img" width={32} height={32} />
          </div>

          {/* Heading */}
          <div className="login-top-text">
          <p className="login-heading" >Sign in with Email</p>
          <p className="subtext">Welcome back! Login to your wishing journey.</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="login-box-from">
        <form onSubmit={handleLogin} className="mt-4">
        <div className="position-relative" style={{marginBottom:'8px'}}>
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
             style={{borderRadius:'50px'}}
            required
          />
        </div>
      </div>

      <div className="position-relative" style={{marginBottom:'8px'}}>
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
            style={{borderRadius:'50px'}}
          />
        </div>
        <a href="#" className="forgot-password">Forgot?</a>
      </div>

      <button type="submit" className="btn btn-primary btn-login w-100">
        Login
      </button>
    </form>
        </div>

        {/* Divider */}
        <div className="my-2">Or</div>

        {/* Google Sign-in Button */}
        <div className="login-box-btm">
          <button className="btn btn-light btn-google w-100 mb-3">
            <i className="bi bi-google"></i> Sign up with Google
          </button>
        </div>
      </div>
      {/* Create New Account */}
      <div className="create-new-con">
      <div className="create-account">
        <a href="#">
          <i className="bi bi-arrow-right-circle"></i> Create a new account
        </a>
      </div>
      </div>
    </div>
    </div>
  );
};

export default LoginScreen;
