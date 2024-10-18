import React from "react";
import "./style.css";
import icon3 from "../../images/lovely.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Myorder = () => {
  const router = useRouter();
  return (
    <>
      <div
        className="mw-orders-section mt-2 cursor-pointer"
        onClick={() => router.push("/orderhistorypage")}
      >
        <div className="mw-orders-title">
          <Image src={icon3}></Image>
          <span>My Orders</span>
        </div>
        <button className="mw-arrow-btn">›</button>
      </div>
    </>
  );
};

export default Myorder;
