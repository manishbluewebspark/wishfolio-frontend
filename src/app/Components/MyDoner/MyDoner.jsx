// DonorList.js

import React from "react";
import Image from "next/image";
// import "./style.css";
import profilePic from "../../images/Male15.png"; // Example profile picture

const MyDoner = (props) => {
  function getDateAndTimeFromISO(isoString) {
    const dateObj = new Date(isoString);
    const date = dateObj.toISOString().split("T")[0];
    const time = dateObj.toISOString().split("T")[1].split(".")[0];
    return { date, time };
  }
  return (
    <div className="pf-donor-container">
      {/* Header Section */}
      <div className="pf-donor-header d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          {}
          {/* <div
            className="pf-donor-avatar"
            style={{ display: props?.type === "complete" ? "none" : "block" }}
          >
            <Image
              src={profilePic}
              alt="avatar"
              width={40}
              height={40}
              className="pf-avatar-img"
            />
          </div> */}
          <span className="pf-donor-title">Donors</span>
        </div>
        <span className="pf-donor-count">
          {props?.donationsDetails?.length}
        </span>
      </div>

      {/* Donor List */}
      <div className="pf-donor-list">
        {props?.donationsDetails.map((donor, index) => (
          <div
            key={index}
            className="pf-donor-item d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${donor.donorImage}`}
                alt={donor.donorName}
                width={40}
                height={40}
                className="pf-donor-img"
              />
              <div className="pf-donor-details">
                <div className="d-flex align-items-center">
                  <span className="pf-donor-name">{donor.donorName}</span>
                  {donor?.verified && (
                    <span className="pf-verified-icon">✔️</span>
                  )}
                </div>
                <span className="pf-donor-time">
                  {getDateAndTimeFromISO(donor?.updatedAt)?.date} •{" "}
                  {getDateAndTimeFromISO(donor?.updatedAt)?.time}
                </span>
              </div>
            </div>
            <span className="pf-donor-amount">{donor.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDoner;
