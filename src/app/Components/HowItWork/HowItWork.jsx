// app/how-it-works/page.js

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './style.css'; // Import custom styles
import Image from 'next/image';
import LevelFlow from './LevelFlow';
// import starIcon from '../../images/star.png'; // Replace with actual paths to icons
// import sunIcon from '../../images/sun.png';
// import treeIcon from '../../images/tree.png';
// import waveIcon from '../../images/wave.png';

const HowItWorks = () => {
  return (
    <div className="hw-container">
      {/* Header */}
      <div className="hw-header d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <button className="hw-back-btn">&larr;</button>
          <h1 className="hw-title">How is it working?</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="hw-tabs d-flex justify-content-between">
        <button className="hw-tab-active">Unblock Levels</button>
        <button className="hw-tab">Levels</button>
      </div>

      {/* Content */}
      <div className="hw-content text-center">
        <h2 className="hw-subtitle">How to Unblock?</h2>
        <ul className="hw-instructions text-left">
          <li>Complete your current level's statistics and target.</li>
          <li>Once you finish, request your wishing item.</li>
          <li>After that, the next stage will be unlocked.</li>
        </ul>

        {/* Level Icons */}
        <div className="hw-level-icons">
          <LevelFlow></LevelFlow>
        </div>

        {/* Level Explanation */}
        <p className="hw-explanation">
          The levels will progress in the order of Star, Tree, Wave, and Sun. Once you complete the Sun level, you’ll return to the Star level again. This structure is designed to ensure that donations continue flowing continuously.
        </p>
      </div>
    </div>
  );
};

export default HowItWorks;
