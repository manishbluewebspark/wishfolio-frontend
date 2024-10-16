import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import leftArrowIcon from "../../images/arrow-left.png";
import "./style.css";

const BackButton = (props) => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };

  return (
    <div>
      <div className="bck-header d-flex justify-content-between align-items-center container">
        <div className="d-flex" onClick={handleBackClick}>
          {" "}
          <Image src={leftArrowIcon} className="me-2" alt="Back Arrow" />
          <h1 className="bck-title text-align-center">{props.title}</h1>
        </div>
      </div>
    </div>
  );
};

export default BackButton;
