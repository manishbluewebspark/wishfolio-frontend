import React from 'react';
import Image from 'next/image'; // Assuming you're using Next.js Image component
import leftArrowIcon from '../../images/arrow-left.png';
import './style.css';
const BackButton = (props) => {
    return (
        <div>
            <div className="bck-header d-flex justify-content-between align-items-center container">
                <div className='d-flex '>
                    <Image src={leftArrowIcon} className='me-2'></Image>
                    <h1 className="bck-title text-align-center">{props.title}</h1>
                </div>
            </div>
        </div>
    );
}

export default BackButton;
