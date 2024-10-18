import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './style.css'; // Import custom styles
import Image from 'next/image';
import imgnew from '../../images/howit.JPG'
import starIcon from '../../images/emoji1.png'; // Replace with actual paths to icons
import sunIcon from '../../images/emoji2.png';
import treeIcon from '../../images/emoji3.png';
import waveIcon from '../../images/emoji4.png';
import arrowIcon from '../../images/roundarrow.png'; // Replace with your arrow icon
import HowToUnblockImg from '../HowToUnblockImg/HowToUnblockImg';

const UnblockLevels = () => {
  return (
    <div className="hw-unblock-levels-container text-center">
      <div>
        <h3 className="hw-unblock-title">How to Unblock?</h3>
        <ul className="hw-unblock-instructions">
          <li>Complete your current level’s statistics and target.</li>
          <li>Once you finish, request your wishing item.</li>
          <li>After that, the next stage will be unlocked.</li>
        </ul>
      </div>
      <div>
         <Image src={imgnew}></Image>
         {/* <HowToUnblockImg></HowToUnblockImg> */}
      </div>
      <div>
        <p className="hw-level-description">
          The levels will progress in the order of Star, Tree, Wave, and Sun. Once
          you complete the Sun level, you’ll return to the Star level again. This
          structure is designed to ensure that donations continue flowing
          continuously.
        </p>
      </div>
    </div>
  );
};

export default UnblockLevels;
