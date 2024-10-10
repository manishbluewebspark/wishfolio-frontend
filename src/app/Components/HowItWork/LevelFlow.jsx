// app/level-flow/page.js

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './style.css'; // Import custom styles
import Image from 'next/image';
import starIcon from '../../images/emoji1.png'; // Replace with actual paths to icons
import sunIcon from '../../images/emoji2.png';
import treeIcon from '../../images/emoji3.png';
import waveIcon from '../../images/emoji4.png';
import arrowIcon from '../../images/roundarrow.png'; // Replace with your arrow icon

const LevelFlow = () => {
  return (
    <div className="hw-level-flow-container text-center">
      <div className="hw-level-icons">
        <div className="hw-arrow hw-arrow-top">
          <Image src={arrowIcon} alt="Arrow" />
        </div>

        <div className="hw-level-circle hw-active">
          <Image src={starIcon} alt="Star" className="hw-level-icon" />
          <p>Star</p>
        </div>

        <div className="hw-arrow hw-arrow-right">
          <Image src={arrowIcon} alt="Arrow" />
        </div>

        <div className="hw-level-row">
          <div className="hw-level-circle">
            <Image src={sunIcon} alt="Sun" className="hw-level-icon" />
            <p>Sun</p>
          </div>

          <div className="hw-level-circle">
            <Image src={treeIcon} alt="Tree" className="hw-level-icon" />
            <p>Tree</p>
          </div>
        </div>

        <div className="hw-arrow hw-arrow-bottom">
          <Image src={arrowIcon} alt="Arrow" />
        </div>

        <div className="hw-level-circle">
          <Image src={waveIcon} alt="Wave" className="hw-level-icon" />
          <p>Wave</p>
        </div>

        <div className="hw-arrow hw-arrow-left">
          <Image src={arrowIcon} alt="Arrow" />
        </div>
      </div>
    </div>
  );
};

export default LevelFlow;
