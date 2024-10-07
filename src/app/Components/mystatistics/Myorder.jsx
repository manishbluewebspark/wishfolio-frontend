import React from 'react';
import './style.css'
import icon3 from '../../images/lovely.png';
import Image from 'next/image';

const Myorder = () => {
    return (
        <div>
            <div className="mw-orders-section mt-2">
                <div className="mw-orders-title">
                    <Image src={icon3}></Image>
                    <span>My Orders</span>
                </div>
                <button className="mw-arrow-btn">›</button>
            </div>
        </div>
    );
}

export default Myorder;
