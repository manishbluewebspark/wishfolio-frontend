"use client";
import { useState } from 'react';
import Image from 'next/image'; // Import the Next.js Image component
import './style.css';
import emoji1 from '../../images/emoji1.png';
import emoji2 from '../../images/emoji2.png';
import emoji3 from '../../images/emoji3.png';
import emoji4 from '../../images/emoji4.png';
import lockIcon from '../../images/lock-circle.jpg';

const EmojisCard = () => {
  const [selected, setSelected] = useState('Star');

  const options = [
    { name: 'Star', emoji: emoji1, locked: false },
    { name: 'Tree', emoji: emoji2, locked: true },
    { name: 'Wave', emoji: emoji3, locked: true },
    { name: 'Sun', emoji: emoji4, locked: true },
  ];

  const handleSelect = (name) => {
    if (!options.find(option => option.name === name).locked) {
      setSelected(name);
    }
  };

  return (
    <div className="emoji-container">
      <div className="emoji-row row">
        {options.map((option) => (
          <div
            key={option.name}
            className={` emoji-card  ${selected === option.name ? 'emoji-selected' : 'emoji-locked'}`}
            onClick={() => handleSelect(option.name)}
          >
           <div className='emoji-card-items'>
           {option.locked && (
              <div className="emoji-lock">
                <Image src={lockIcon} width={18} height={18}></Image>
              </div>
            )}
            <div className="emoji-name">
              {option.name}
            </div>
            <div className="emoji-icon">
              <Image src={option.emoji} alt={option.name} width={32} height={32} />
            </div>
           </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmojisCard;
