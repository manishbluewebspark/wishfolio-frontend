"use client"
import React from 'react';
import Image from 'next/image';
import howitworkicon from '../../images/message-question.svg'
import { useRouter } from "next/navigation";

const HowItWorkingBtn = () => {
  const router = useRouter();
  return (
    <div className='hoitw_btn-con'>
        <button style={styles.button_hoitw} onClick={() => router.push("/howitworkpage")}>
      <span style={styles.icon_hoitw}>
        <Image 
          src={howitworkicon }// Replace with your actual path or URL
          alt="Question Icon"
          width={20} // Adjust the width as needed
          height={20} // Adjust the height as needed
        />
      </span>
      <span style={styles.text_hoitw}>How is it working?</span>
    </button>
    </div>
  );
};

const styles = {
  button_hoitw: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFE35A', // Yellow background
    padding: '10px',
    borderRadius: '70px',
    border: 'none',
    cursor: 'pointer',
    height:'41px',
    width:'169.83px',
    // position:'sticky',
    // bottom:'10px',
    // left:'58%',
  },
  icon_hoitw: {
    borderRadius: '50%',
    marginRight: '5.25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_hoitw: {
    fontWeight: 800, // Remove quotes from the number
    color: '#000', 
    fontSize: '14px',
  },
};

export default HowItWorkingBtn;
