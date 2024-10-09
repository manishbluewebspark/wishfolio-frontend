"use client";
import { useState, useEffect } from "react";
import Image from "next/image"; // Import the Next.js Image component
import "./style.css";
import lockIcon from "../../images/lock-circle.jpg";
import { fetchLevels } from "../../store/slices/levelsSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByLevel } from "../../store/slices/productByLevelSlice";
const EmojisCard = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const { levels, loading, error } = useSelector((state) => state.levels);

  useEffect(() => {
    dispatch(fetchLevels());
  }, [dispatch]);

  useEffect(() => {
    if (levels.length > 0 && !selected) {
      setSelected(levels[0].labelName);
      setSelectedId(levels[0]._id);
      dispatch(fetchProductsByLevel(levels[0]._id));
    }
  }, [levels, selected, dispatch]);
  const handleSelect = (name, id) => {
    setSelected(name);
    setSelectedId(id);
    dispatch(fetchProductsByLevel(id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="emoji-container">
      <div className="emoji-row row">
        {levels.map((option, index) => (
          <div
            key={index}
            className={`emoji-card ${
              selected === option.labelName ? "emoji-selected" : "emoji-locked"
            }`}
            onClick={() => handleSelect(option.labelName, option._id)}
          >
            <div className="emoji-card-items">
              {option?.locked && (
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
    </div>
  );
};

export default EmojisCard;
