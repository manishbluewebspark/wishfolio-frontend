"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import emojiIconStar from "../../images/emoji1.png";
import emojiIconTree from "../../images/emoji2.png";
import emojiIconWave from "../../images/emoji3.png";
import emojiIconSun from "../../images/emoji4.png";
import lockIcon from "../../images/lock-circle.jpg";
import dropdownIcon from "../../images/arrow-down.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchLevels } from "../../store/slices/levelsSlice";
const LevelDropdown = ({ onLevelChange }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const { levels, loading, error } = useSelector((state) => state.levels);
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchLevels()); // Fetch levels on component load
  }, [dispatch]);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (levels) {
      setSelectedName(levels[userData?.userLevel]?.labelName);
      setSelectedImage(levels[userData?.userLevel]?.imageUrl);
    }
  }, [levels, userData]);
  const handleSelect = (name, image, index) => {
    onLevelChange(index);
    setSelectedName(name);
    setSelectedImage(image);
    setIsOpen(false);
  };
  return (
    <div className="wi-level-dropdown-container">
      {/* Dropdown Trigger */}
      <div className="wi-level-dropdown-trigger" onClick={toggleDropdown}>
        <Image
          src={`${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${selectedImage}`}
          alt="Star Level"
          width={20}
          height={20}
        />
        <span className="wi-level-trigger-text">{selectedName}</span>
        <span className="wi-level-trigger-arrow">
          <Image src={dropdownIcon}></Image>
        </span>
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="wi-level-dropdown">
          {levels.map((option, index) => (
            <div
              className="wi-level-item"
              key={index}
              onClick={() =>
                handleSelect(option.labelName, option.imageUrl, index)
              }
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${option.imageUrl}`}
                alt="Star Level"
                width={20}
                height={20}
                className="wi-level-icon"
              />
              <span className="wi-level-name">{option.labelName}</span>

              {index + 1 !== userData?.userLevel && (
                <Image
                  src={lockIcon}
                  alt="Locked"
                  width={16}
                  height={16}
                  className="wi-level-lock"
                />
              )}
              {index + 1 == userData?.userLevel && (
                <span className="wi-level-status">Current</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LevelDropdown;
