import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Image from "next/image";
import roundarrow from "../../images/roundarrow.png";
import roundarr2 from "../../images/roundarrow2.png";
import roundarr3 from "../../images/roundarr3.png";
import roundarr4 from "../../images/roundarr4.png";
import starIcon from '../../images/emoji1.png'; // Ensure correct paths
import sunIcon from '../../images/emoji2.png';
import treeIcon from '../../images/emoji3.png';
import waveIcon from '../../images/emoji4.png';
import lockIcon from '../../images/lock-circle.jpg'; // Ensure path to lock icon
import "./style.css"; // Import custom styles

const HowToUnblockImg = ({ selected, handleSelect }) => {
  // Define emoji levels or options
  const levels = [
    { labelName: 'Star', imageUrl: starIcon, locked: false, _id: '1' },
    { labelName: 'Sun', imageUrl: sunIcon, locked: true, _id: '2' },
    { labelName: 'Tree', imageUrl: treeIcon, locked: true, _id: '3' },
    { labelName: 'Wave', imageUrl: waveIcon, locked: true, _id: '4' },
  ];

  return (
    <div className="htubi-emoji-container text-center">
      <div className="htubi-emoji-row">
        <div className="htubi-emoji-arrow">
          <Image src={roundarrow} className="htubi-round-arrow" height={16} width={36} alt="Arrow" />
        </div>
        <div className={`htubi-emoji-card-bg htubi-emoji-card ${selected === 'Star' ? "htubi-emoji-selected" : "htubi-emoji-locked"}`} onClick={() => handleSelect('Star', '1')}>
          <div className="htubi-emoji-card-items">
            {false && ( // Optionally show the lock icon if locked
              <div className="htubi-emoji-lock">
                <Image src={lockIcon} width={16.64} height={16.64} alt="lock" />
              </div>
            )}
            <div className="htubi-emoji-name">Star</div>
            <div className="htubi-emoji-icon">
              <Image src={starIcon} alt="Star" width={26.96} height={26.96} />
            </div>
          </div>
        </div>
        <div className="htubi-emoji-arrow">
          <Image src={roundarr2} className="htubi-round-arrow" height={16} width={36} alt="Arrow" />
        </div>
      </div>
      <div className="htubi-emoji-row">
        <div className={`htubi-emoji-card ${selected === 'Sun' ? "htubi-emoji-selected" : "htubi-emoji-locked"}`} onClick={() => handleSelect('Sun', '2')}>
          <div className="htubi-emoji-card-items">
          {true && ( // Show lock icon if the emoji is locked
              <div className="htubi-emoji-lock">
                <Image src={lockIcon} width={16.64} height={16.64} alt="lock" />
              </div>
            )}
            <div className="htubi-emoji-name">Sun</div>
            <div className="htubi-emoji-icon">
              <Image src={sunIcon} alt="Sun" width={26.96} height={26.96} />
            </div>
          </div>
        </div>
        <div className={`htubi-emoji-card ${selected === 'Tree' ? "htubi-emoji-selected" : "htubi-emoji-locked"}`} onClick={() => handleSelect('Tree', '3')}>
          <div className="htubi-emoji-card-items">
          {true && ( // Show lock icon if the emoji is locked
              <div className="htubi-emoji-lock">
                <Image src={lockIcon} width={16.64} height={16.64} alt="lock" />
              </div>
            )}
            <div className="htubi-emoji-name">Tree</div>
            <div className="htubi-emoji-icon">
              <Image src={treeIcon} alt="Tree" width={26.96} height={26.96} />
            </div>
          </div>
        </div>
      </div>
      <div className="htubi-emoji-row">
        <div className="htubi-emoji-arrow">
          <Image src={roundarr4} className="htubi-round-arrow" height={16} width={36} alt="Arrow" />
        </div>
        <div className={`htubi-emoji-card ${selected === 'Wave' ? "htubi-emoji-selected" : "htubi-emoji-locked"}`} onClick={() => handleSelect('Wave', '4')}>
          <div className="htubi-emoji-card-items">
            {true && ( // Show lock icon if the emoji is locked
              <div className="htubi-emoji-lock">
                <Image src={lockIcon} width={16.64} height={16.64} alt="lock" />
              </div>
            )}
            <div className="htubi-emoji-name">Wave</div>
            <div className="htubi-emoji-icon">
              <Image src={waveIcon} alt="Wave"  width={26.96} height={26.96} />
            </div>
          </div>
        </div>
        <div className="htubi-emoji-arrow">
          <Image src={roundarr3} className="htubi-round-arrow" height={16} width={36} alt="Arrow" />
        </div>
      </div>
    </div>
  );
};

export default HowToUnblockImg;
