"use client";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import logo from "../../images/snow.png"; // Replace with your logo path
// import './style.css';
import { Icon } from "@iconify/react";
import lockIcon from "@iconify/icons-mdi/lock-outline"; // Correct lock icon from Iconify

const UpdatePasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      // Add logic to update password here
      alert("Password updated successfully!");
    }
  };

  return (
    <div className="d-flex em-update-main-container">
      <div className="em-update-container">
        <div className="em-update-box">
          <div className="em-update-box-top">
            <Image
              src={logo}
              alt="Logo"
              className="em-update-box-logo"
              width={32}
              height={32}
            />
            <div className="em-update-top-text text-center">
              <h2 className="em-update-heading">What is your email ID</h2>
              <p className="subtext">
                Start your wishing journey by signing up.
              </p>
            </div>
          </div>

          {/* Password Update Form */}
          <form onSubmit={handlePasswordUpdate}>
            {/* Input field for new password */}
            <div className="input-container mb-3 position-relative">
              <Icon icon={lockIcon} width="20" className="input-icon" />
              <input
                type="password"
                className="form-control custom-input"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            {/* Input field for confirm password */}
            <div className="input-container mb-3 position-relative">
              <Icon icon={lockIcon} width="20" className="input-icon" />
              <input
                type="password"
                className="form-control custom-input"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Update Password button */}
            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-primary em-btn-update">
                Update Password
              </button>
            </div>
          </form>

          {/* Policy and terms */}
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
};

export default UpdatePasswordForm;
