"use client"
import React from 'react';
import UnblockLevels from '../../Components/HowItWork/UnblockLevels';
import HowToUnblockImg from '../HowToUnblockImg/HowToUnblockImg';
import Image from 'next/image';
import snowIcon from '../../images/Snow.svg'

const HowToUnblockComp = () => {
    return (
        <>
        <div className='htucomp-main-con'>
        <div className='htucomp-img-con'>
           <Image src={snowIcon}></Image>
        </div>
        <div className={`hw-unblock-levels-container text-center`}>
      <div>
        <h3 className="hw-unblock-title">How to Unblock?</h3>
        <ul className="hw-unblock-instructions">
          <li>Complete your current level’s statistics and target.</li>
          <li>Once you finish, request your wishing item.</li>
          <li>After that, the next stage will be unlocked.</li>
        </ul>
      </div>
      <div className={`hw-unblock-img-con`}>
        {/* <Image src={imgnew}></Image> */}
        <HowToUnblockImg></HowToUnblockImg>
      </div>
      <div>
        <p className="hw-level-description">
          The levels will progress in the order of Star, Tree, Wave, and Sun.
          Once you complete the Sun level, you’ll return to the Star level
          again. This structure is designed to ensure that donations continue
          flowing continuously.
        </p>
      </div>
    </div>
        </div>
        </>
    );
}

export default HowToUnblockComp;
