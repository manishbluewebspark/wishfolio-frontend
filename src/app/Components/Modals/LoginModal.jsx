import React from "react";
// import './style.css';
import Image from "next/image";
import logo from "../../images/snow.png";
import logoIcon from "../../images/Snow.svg"; // Replace with your logo
import { useRouter } from "next/navigation";

const LoginModal = ({ isOpen, onClose, onConfirm }) => {
  const router = useRouter();
  const handleGotoLogin = () => {
    router.push("/login");
  };
  return (
    <div className={`pf-logout-modal-wrapper ${isOpen ? "show" : ""}`}>
      <div className="login-pf-logout-modal-content">
        <div className="login-pf-login-main-container">
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
                <button
                  type="submit"
                  className="btn-login w-100"
                  onClick={handleGotoLogin}
                >
                  Login
                </button>
              </div>
            </div>
            <div className="terms-container-hw login-margin-top">
              By continuing, you agree to our
              <a href="/privacy-policy" className="text-muted-hw">
                Privacy Policy
              </a>
              and
              <a href="/termsandconditions" className="text-muted-hw">
                Terms of Service
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
