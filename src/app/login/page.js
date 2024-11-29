"use client"; // Ensure this is the first line

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // For client-side navigation
import { loginUser } from "../store/slices/authSlice"; // Import the login thunk from authSlice
import logoIcon from "../images/Snow.svg"; // Replace with your logo
import { setEmail } from "../store/slices/signupSlice";
import { toast } from "react-toastify";
import googleIcon from "../images/googleicon.svg";
import Image from "next/image";
import emailicon from "../images/emailicon.svg";
import addicon from "../images/add.svg";
import arrowright from "../images/arrow-right.svg";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
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
        toast.success("OTP sent successfully");
        // Redirect to home page after successful login
        router.push("/login/verify-otp");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleCreateAccount = () => {
    router.push("/signup/email");
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google Login Success:", tokenResponse);
      const { credential } = tokenResponse;
      const { access_token } = tokenResponse;
      try {
        // Use the access token to get user profile data from Google's userinfo API
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        const userData = res.data;
        const response = await axios.post(
          `${API_BASE_URL}/user/googleLogin`,
          userData
        );
        if (response.status === 201) {
          if (response?.data?.id === "userNotFound") {
            dispatch(setEmail(userData?.email));
            router.push("/signup/mobile");
          } else {
            localStorage.setItem("user", JSON.stringify(response.data));
            toast.success("Login successfully");
            router.push("/");
          }
        }

        //toast.success("Google login successful!");
        // router.push("/dashboard"); // Redirect to dashboard or home page
      } catch (error) {
        console.error("Error fetching Google user info:", error);
        toast.error("Failed to fetch user info");
      }
    },
    onError: (error) => {
      console.error("Google login failed:", error);
      toast.error("Google login failed");
    },
  });

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
                  className="input-group custom-input"
                  style={{ marginBottom: "8px" }}
                >
                  <span className="input-group-text login-input-group-text">
                    <Image
                      src={emailicon}
                      alt="Email Icon"
                      width={24}
                      height={24}
                    />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmailState(e.target.value)}
                    style={{
                      border: "none", // Remove border
                      outline: "none", // Remove default outline
                    }}
                    required
                  />
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="btn-login w-100"
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
                className="btn-google w-100"
                onClick={() => handleGoogleLogin()}
              >
                <Image
                  src={googleIcon}
                  height={24}
                  width={24}
                  alt="socialIcon"
                  className="social-icon"
                />
                Sign in with Google
              </button>
            </div>
          </div>

          {/* Create New Account */}
          <div className="create-new-con">
            <button
              className="btn-google login-create-acc-btn w-100"
              onClick={() => handleCreateAccount()}
            >
              <span className="d-flex justify-content-center align-items-center">
                <Image
                  src={addicon}
                  height={20}
                  width={20}
                  alt="addicon"
                  className="login-addicon"
                />
                Create a new account
              </span>
              <Image src={arrowright} height={20} width={20} alt="arrowright" />
            </button>
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
    </>
  );
};

export default LoginScreen;
