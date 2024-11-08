import React from "react";
// import "./style.css";
import icon3 from "../../images/lovely.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Myorder = () => {
  const router = useRouter();
  return (
    <>
      <div
        className="mw-orders-section cursor-pointer"
        onClick={() => router.push("/orderhistorypage")}
      >
        <div className="mw-orders-title">
          <div className="mw-order-img-con">
          <Image src={icon3}></Image>
          </div>
          <span>My Orders</span>
        </div>
        <button className="mw-arrow-btn">›</button>
      </div>
    </>
  );
};

export default Myorder;
