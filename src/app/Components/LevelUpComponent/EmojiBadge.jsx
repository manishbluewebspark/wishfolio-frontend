// components/EmojiBadge.js
import Image from 'next/image';
import React from 'react';
import emojiicon from '../../images/emoji1.png';

const EmojiBadge = () => {
  return (
    <div className="emojiBadgeLuc">
      <h2 className="titleLuc">Tree</h2>
      <div className="emojiLuc">
        <Image src={emojiicon} height={48.35} width={48.35}></Image>
      </div>
    </div>
  );
};

export default EmojiBadge;
