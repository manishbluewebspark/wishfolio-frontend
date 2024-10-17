import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './style.css'; // Import custom styles
import Image from 'next/image';
// import starIcon from '../../images/emoji1.png'; 
// import sunIcon from '../../images/emoji2.png';
// import treeIcon from '../../images/emoji3.png';
// import waveIcon from '../../images/emoji4.png';
// import arrowIcon from '../../images/arrow.png';
import './style.css'

const HowToUnblock = () => {
    return (
        <div className="h-level-container text-center">
          <div className="h-level-grid">
            {/* Sun Level */}
            <div className="h-level-item">
              <div className="h-level-circle">
                <Image src={''} alt="Sun" className="h-level-icon" />
                <p>Sun</p>
                <div className="h-level-lock-icon">🔒</div>
              </div>
            </div>
    
            {/* Arrow Right */}
            <div className="h-level-arrow-right">
              <Image src={''} alt="Arrow Right" />
            </div>
    
            {/* Star Level */}
            <div className="h-level-item h-level-active">
              <div className="h-level-circle">
                <Image src={''} alt="Star" className="h-level-icon" />
                <p>Star</p>
              </div>
            </div>
    
            {/* Arrow Left */}
            <div className="h-level-arrow-left">
              <Image src={''} alt="Arrow Left" />
            </div>
    
            {/* Tree Level */}
            <div className="h-level-item">
              <div className="h-level-circle">
                <Image src={''} alt="Tree" className="h-level-icon" />
                <p>Tree</p>
                <div className="h-level-lock-icon">🔒</div>
              </div>
            </div>
    
            {/* Arrow Bottom */}
            <div className="h-level-arrow-bottom">
              <Image src={''} alt="Arrow Bottom" />
            </div>
    
            {/* Wave Level */}
            <div className="h-level-item">
              <div className="h-level-circle">
                <Image src={''} alt="Wave" className="h-level-icon" />
                <p>Wave</p>
                <div className="h-level-lock-icon">🔒</div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default HowToUnblock;
