import React from "react";
// import './style.css';
import Image from "next/image";
import logo from "../../images/snow.png";
import logoIcon from "../../images/ep_success-filled.svg"; // Replace with your logo
import { useRouter } from "next/navigation";
import crossicon from "../../images/cross.svg";

const GotRequestModal = ({ isOpen, onClose, onConfirm }) => {
  const router = useRouter();
  const handleGotoMyOrder = () => {
    router.push("/levelup");
  };
  return (
    <div className={`pf-logout-modal-wrapper ${isOpen ? "show" : ""}`}>
      <div className="got-u-req-modal-content">
        <div className="got-u-req-main-container">
          <div className="got-u-req-container">
            <div className="npmc-close-btn-con" onClick={onClose}>
              <button className="npmc-close-btn">
                <Image src={crossicon} height={9} width={9} alt="x"></Image>
              </button>
            </div>
            <div className="got-u-req-box text-center">
              {/* Logo */}
              <div className="got-u-req-box-top">
                <div className="got-u-req-box-logo">
                  <Image
                    src={logoIcon}
                    alt="Logo"
                    className="logo-img"
                    width={49}
                    height={49}
                  />
                </div>
              </div>

              {/* Button */}
              <div className="got-u-req-box-form">
                <h2 className="got-u-req-text">We Got Your Request</h2>
                <p className="got-u-req-subtext">
                  We’ve received your wish product request. It will be delivered
                  to your address within <strong>2-14 working days</strong>.
                  Once you receive your product, please share your review with
                  us.
                </p>
                <button
                  type="submit"
                  className="btn-login w-100"
                  onClick={handleGotoMyOrder}
                >
                  GO to My Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GotRequestModal;
