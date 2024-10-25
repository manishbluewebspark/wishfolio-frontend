"use client"; // Ensure this is the first line

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // For client-side navigation
import { loginUser } from "../store/slices/authSlice"; // Import the login thunk from authSlice
import logoIcon from "../images/Snow.svg"; // Replace with your logo
import lockIcon from "@iconify/icons-mdi/lock";
import { setEmail } from "../store/slices/signupSlice";
import { toast } from "react-toastify";
import googleIcon from "../images/googleicon.svg";
import Image from "next/image";
import emailicon from '../images/emailicon.svg';
import addicon  from '../images/add.svg';
import arrowright from '../images/arrow-right.svg'

const LoginScreen = () => {
  const [email, setEmailState] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const { token, isLoading, error } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email }))
      .unwrap()
      .then((userData) => {
        dispatch(setEmail(email));
        toast.success("otp send successfully");
        // Redirect to home page after successful login
        // localStorage.setItem("user", JSON.stringify(userData));
        router.push("/login/verify-otp");
      })
      .catch((err) => {
        toast.error(err);
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
              
                  <div className="input-group custom-input" style={{marginBottom:'8px'}} >
                    <span className="input-group-text login-input-group-text">
                      <Image src={emailicon} alt="Email Icon" width={24} height={24} />
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmailState(e.target.value)}
                      style={{
                        border: 'none', // Remove border
                        outline: 'none', // Remove default outline
                      }}
                      required
                    />
                  </div>

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
                className="btn btn-primary btn-google w-100"
                onClick={() => handleCreateAccount()}
              >
                <Image
                  src={googleIcon}
                  height={24}
                  width={24}
                  alt="socialIcon"
                  className="social-icon"
                ></Image>
                Sign up with Google
              </button>
            </div>
          </div>

          {/* Create New Account */}
          <div className="create-new-con">
            <button
              className="btn btn-primary btn-google login-create-acc-btn w-100 mb-3"
              onClick={() => handleCreateAccount()}
            >
              <span className='d-flex justify-content-center align-items-center'>
             <Image src={addicon} height={20} width={20} alt="addicon" className="login-addicon"></Image> 
              Create a new account
             </span>
             <Image src={arrowright}  height={20} width={20} alt="arrowright"></Image>
            </button>
          </div>
          <div className="terms-container-hw login-margin-top">
              By continuing, you agree to our
              <a href="/privacy-policy" className="text-muted-hw">
                Privacy Policy
              </a>
              and
              <a href="/terms-of-service" className="text-muted-hw">
                Terms of Service
              </a>
              .
            </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
