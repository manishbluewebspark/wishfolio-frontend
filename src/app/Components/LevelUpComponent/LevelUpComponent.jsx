// components/LevelUpComponent.js
import React from 'react';
import EmojiBadge from './EmojiBadge'
import StatisticsLevelUp from '../../Components/LevelUpComponent/StatisticsLevelUp';

const LevelUpComponent = () => {
  return (
    <div className='levelUpContainerLuc-main'>
        <div className="levelUpContainerLuc">
      {/* Close Button */}
      {/* <button className="closeButtonLuc">✕</button> */}

      {/* Emoji Section */}
      <div className='emojiluc-sec'>
      <EmojiBadge></EmojiBadge>
      </div>

      {/* Message Section */}
      <h3 className="levelUpTextLuc">Level Up!</h3>
      <p className="congratsTextLuc">Congratulations, you are now in Level Tree.</p>

      {/* Wishing Items Section */}
      <StatisticsLevelUp></StatisticsLevelUp>

      {/* Button */}
      <button className="donateButtonLuc">Start Donating</button>
    </div>
    </div>
  );
};

export default LevelUpComponent;
