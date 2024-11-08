"use client"
import React, { useState } from "react";
import Image from "next/image";
import emojiIconStar from "../../images/emoji1.png";
import emojiIconTree from "../../images/emoji2.png";
import emojiIconWave from "../../images/emoji3.png";
import emojiIconSun from "../../images/emoji4.png";
import lockIcon from "../../images/lock-circle.jpg";
import dropdownIcon from '../../images/arrow-down.svg';

const LevelDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="wi-level-dropdown-container">
      {/* Dropdown Trigger */}
      <div className="wi-level-dropdown-trigger" onClick={toggleDropdown}>
        <Image src={emojiIconStar} alt="Star Level" width={20} height={20} />
        <span className="wi-level-trigger-text">Star</span>
        <span className="wi-level-trigger-arrow">
          <Image src={dropdownIcon}></Image>
        </span>
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="wi-level-dropdown">
          <div className="wi-level-item">
            <Image src={emojiIconStar} alt="Star Level" width={20} height={20} className="wi-level-icon" />
            <span className="wi-level-name">Star</span>
            <span className="wi-level-status">Current</span>
          </div>

          <div className="wi-level-item">
            <Image src={emojiIconTree} alt="Tree Level" width={20} height={20} className="wi-level-icon" />
            <span className="wi-level-name">Tree</span>
            <Image src={lockIcon} alt="Locked" width={16} height={16} className="wi-level-lock" />
          </div>

          <div className="wi-level-item">
            <Image src={emojiIconWave} alt="Wave Level" width={20} height={20} className="wi-level-icon" />
            <span className="wi-level-name">Wave</span>
            <Image src={lockIcon} alt="Locked" width={16} height={16} className="wi-level-lock" />
          </div>

          <div className="wi-level-item">
            <Image src={emojiIconSun} alt="Sun Level" width={20} height={20} className="wi-level-icon" />
            <span className="wi-level-name">Sun</span>
            <Image src={lockIcon} alt="Locked" width={16} height={16} className="wi-level-lock" />
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelDropdown;
