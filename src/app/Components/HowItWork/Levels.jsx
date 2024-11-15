import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
// import './style.css'; // Import custom styles
import Image from "next/image";
import dollarIcon from "../../images/dollar-circle.png"; // Replace with your icons
import dropIcon from "../../images/drop.png"; // Replace with your icons
import emojiIocn from "../../images/emoji1.png";
import { fetchLevels } from "../../store/slices/levelsSlice";
import { useDispatch, useSelector } from "react-redux";
const Levels = () => {
  const dispatch = useDispatch();
  const { levels, loading, error } = useSelector((state) => state.levels);
  useEffect(() => {
    dispatch(fetchLevels()); // Fetch levels on component load
  }, [dispatch]);

  return (
    <>
      {levels.map((option, index) => (
        <div className="hwl-statistics-section shadow-sm">
          <div className="hwl-statistics-inside-sec" key={index}>
            {/* Star Level Section */}
            <div className="hwl-level-content d-flex align-items-center">
              <div className="hwl-level-icon-section">
                <h3>{option.labelName}</h3>
                <Image
                  src={`${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${option.imageUrl}`}
                  alt="Star"
                  height={32}
                  width={32}
                  className="hwl-level-icon"
                />
                <div className="hwl-current-level-badge-con">
                  <span className="hwl-current-level-badge">Current Level</span>
                </div>
              </div>
              <div className="hwl-wishing-items">
                <h5>Wishing Items</h5>
                <p>₹{option?.worthItem} - Worth Items</p>
              </div>
            </div>

            {/* Target Section */}
            <div className="hwl-target-section">
              <h6 className="hwl-Target-text">Target to be completed</h6>
              <div className="hwl-stat-item d-flex align-items-center">
                <Image
                  src={dollarIcon}
                  alt="Min Donations"
                  className="hwl-icon"
                />
                <div className="hwl-stat-text d-flex justify-content-between w-100 align-items-center">
                  <span>Min Donations</span>
                  <h6>₹{option?.minimumDonation}</h6>
                </div>
              </div>

              <div
                className="hwl-stat-item d-flex align-items-center"
                style={{ marginBottom: "0px !important" }}
              >
                <Image
                  src={dropIcon}
                  alt="Number of Donations"
                  className="hwl-icon"
                />
                <div className="hwl-stat-text d-flex justify-content-between w-100 align-items-center">
                  <span>Number of Donations</span>
                  <h6>{option?.numberOfDonations}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Levels;
