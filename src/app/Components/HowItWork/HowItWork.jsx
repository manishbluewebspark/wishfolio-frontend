"use client";
import React, { useState } from "react";
import UnblockLevels from "./UnblockLevels";
import Levels from "./Levels";
import BackButton from "../Button/BackButton";
// import "./style.css"; // Add your styles here

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState("unblock");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
    < BackButton title={'How is it working ?'}></BackButton>
      <div className="hw-how-it-works-container">
      {/* Tab Header */}
      <div className="hw-tabs">
        <button
          className={`hw-tab-btn ${activeTab === "unblock" ? "active" : ""}`}
          onClick={() => handleTabChange("unblock")}
        >
          Unblock Levels
        </button>
        <button
          className={`hw-tab-btn ${activeTab === "levels" ? "active" : ""}`}
          onClick={() => handleTabChange("levels")}
        >
          Levels
        </button>
      </div>

      {/* Tab Content */}
      <div className="hw-tab-content">
        {activeTab === "unblock" && <UnblockLevels />}
        {activeTab === "levels" && <Levels />}
      </div>
    </div>
    </>
  );
};

export default HowItWorks;
