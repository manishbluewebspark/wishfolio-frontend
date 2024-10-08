"use client";
import { useState } from 'react';
import Image from 'next/image';
import './style.css';
import starIcon from '../../images/star.jpg'; // Replace with your icon path
import dropIcon from '../../images/drop.jpg'; // Replace with your icon path
import vectorIcon from '../../images/moon.png'; // Replace with your icon path
import profileIcon from '../../images/Male15.png'; // Replace with your icon path

const BottomNav = () => {
  const [selected, setSelected] = useState('Wishes');

  const options = [
    { name: 'Wishes', icon: starIcon, isImage: true },
    { name: 'My Donations', icon: dropIcon, isImage: true },
    { name: 'My Wish', icon: vectorIcon, isImage: true },
    { name: 'Profile', icon: profileIcon, isImage: true },
  ];

  const handleSelect = (name) => {
    setSelected(name);
  };

  return (
    <div className="bottom-nav fixed-bottom bg-light">
      <div className="">
        <div className="row text-center">
          {options.map((option) => (
            <div
              key={option.name}
              className={`col ${selected === option.name ? 'active-item' : ''}`}
              onClick={() => handleSelect(option.name)}
            >
              <div className="icon-container-bn">
                <Image
                  src={option.icon}
                  alt={option.name}
                  width={24}
                  height={24}
                  className="rounded-circle"
                />
              </div>
              <div className={`nav-text-bn ${selected === option.name ? 'active-text' : ''}`}>
                {option.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
