import React from "react";
// import './style.css';
import Image from "next/image";
import logo from "../../images/snow.png";
import logoIcon from "../../images/Snow.svg"; // Replace with your logo
import { useRouter } from "next/navigation";
import crossicon from '../../images/cross.svg';
import MyDoner from "../MyDoner/MyDoner";
import CurrencyName from "../Comman/CurrencyName";
import styles from "../../submitForDelivery/AddressPage.module.css";

const MyOrderOnGoingModal = ({ isOpen, onClose, onConfirm, order }) => {
  const router = useRouter();
  const handleGotoLogin = () => {
    router.push("/login");
  };
  if (!isOpen) return null; // If modal is not open, return nothing
  const getSumOfAmounts = (donations) => {
    return donations.reduce((total, donation) => total + donation.amount, 0);
  };
  return (
    <div className={`pf-logout-modal-wrapper ${isOpen ? "show" : ""}`}>
      <div className="moogm-logout-modal-content">
  <div className="moogm-login-main-container">
    <div className="moogm-container">
        <div className="npmc-close-btn-con" onClick={onClose}>
            <button  className="npmc-close-btn">
              <Image src={crossicon} height={9} width={9} alt="x"></Image>
            </button>
        </div>
        <div className="moogm-box ">
                   {/* Product Image in Modal */}
          <Image
            src={`${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${order.productImageUrl}`}
            alt="Product in modal"
            width={136}
            height={153}
          />
          <h4 className="moogm-text-head">
            <CurrencyName />
            {getSumOfAmounts(order.donationsDetails) || 0} 
            <span style={{color:'#a48888', fontWeight:'500'}}>/<CurrencyName />{order.productPrice} Donated</span>
          </h4>
          <p className="moogm-text-subtext">{order.productName}</p>

          <div className="phis-donors">
            <MyDoner
              donationsDetails={order.donationsDetails}
              type="complete"
            ></MyDoner>
          </div>
          <div
            className={`card delivery-address-con mb-4 ${styles.card}`}

          >
            <p className="mb-1 text-start delivery-address-subtext">
            <strong>Address :</strong> {order.country}, {order.state},{" "}
            {order.city}
            </p>
            <p className="mb-1 text-start delivery-address-subtext">
            Address Line 1: {order.address_line_1} {order.address_line_2}
            </p>
            <p className="mb-1 text-start v">Pin Code: {order.pincode}</p>
            <p className="mb-0 text-start delivery-address-subtext">Road Number:{order.roomNumber}</p>
          </div>
        </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default MyOrderOnGoingModal;
