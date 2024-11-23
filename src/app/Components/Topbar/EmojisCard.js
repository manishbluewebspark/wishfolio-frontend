"use client";
import { useState, useEffect } from "react";
import Image from "next/image"; // Import the Next.js Image component
import lockIcon from "../../images/lock-circle.svg"; // Locked level icon
import { fetchLevels } from "../../store/slices/levelsSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByLevel } from "../../store/slices/productByLevelSlice";
import HowToUnblockModal from "../../Components/Modals/HowToUnblockModal"; // Modal for locked levels

const EmojisCard = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const { levels, loading, error } = useSelector((state) => state.levels); // Fetch levels
  const { userData } = useSelector((state) => state.user); // Fetch user data (including userLevel)

  useEffect(() => {
    dispatch(fetchLevels()); // Fetch levels on component load
  }, [dispatch]);

  useEffect(() => {
    if (levels.length > 0 && !selected) {
      const firstUnlockedLevel = levels.find(
        (level, index) => index + 1 == userData?.userLevel
      );
      if (firstUnlockedLevel) {
        setSelected(firstUnlockedLevel.labelName);
        setSelectedId(firstUnlockedLevel._id);
        dispatch(fetchProductsByLevel(firstUnlockedLevel._id)); // Fetch products for the first unlocked level
      } else {
        dispatch(fetchProductsByLevel(levels[0]._id));
      }
    }
  }, [levels, selected, userData, dispatch]);

  // Handle level selection based on user's level
  const handleSelect = (name, id, index) => {
    if (index >= userData.userLevel) {
      setModalOpen(true); // Open modal if the level is locked
    } else {
      setSelected(name); // Set the selected level
      setSelectedId(id);
      dispatch(fetchProductsByLevel(id)); // Fetch products by level ID
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Confirm modal action
  const handleConfirmModal = () => {
    setModalOpen(false); // You can add custom logic for when the modal is confirmed
  };

  if (loading) return <p>Loading...</p>; // Show loading message
  if (error) return <p>Error: {error}</p>; // Show error message

  return (
    <div className="emoji-container container">
      <div className="emoji-row">
        {levels.map((option, index) => (
          <div
            key={index}
            className={`emoji-card ${
              selected === option.labelName ? "emoji-selected" : "" // Highlight selected level
            } ${index >= userData?.userLevel ? "emoji-locked" : ""}`} // Add "emoji-locked" class if the level is locked
            onClick={() => handleSelect(option.labelName, option._id, index)}
          >
            <div className="emoji-card-items">
              {/* Show lock icon if the level is locked */}
              {index + 1 !== userData?.userLevel && (
                <div className="emoji-lock">
                  <Image src={lockIcon} width={18} height={18} alt="lock" />
                </div>
              )}
              <div className="emoji-name">{option.labelName}</div>
              <div className="emoji-icon">
                <Image
                  src={`${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${option.imageUrl}`}
                  alt={option.labelName}
                  width={32}
                  height={32}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for locked levels */}
      <HowToUnblockModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
      />
    </div>
  );
};

export default EmojisCard;
