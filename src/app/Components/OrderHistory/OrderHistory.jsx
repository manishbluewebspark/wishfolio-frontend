"use client";
import React, { useState } from 'react';
import './orderhistory.css'; // Custom CSS file
import BackButton from '../Button/BackButton';
import OrderItem from './OrderItem';

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState('ongoing'); // State for active tab

  return (

    <div>
        <BackButton title={'My Orders'}></BackButton>
        <div className="container phis-container">
      {/* Tabs */}
      <div className="phis-tabs row">
        <div
          className={`col phis-tab ${activeTab === 'ongoing' ? 'phis-active' : ''}`}
          onClick={() => setActiveTab('ongoing')}
        >
          Ongoing
        </div>
        <div
          className={`col phis-tab ${activeTab === 'completed' ? 'phis-active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </div>
      </div>

      {/* Content */}
      <div className="phis-content">
        {activeTab === 'ongoing' && (
          <div>
            {/* <p className="phis-empty-message">
            You don’t have any order history yet.
          </p> */}
          <OrderItem></OrderItem>
          </div>
        )}
        {activeTab === 'completed' && (
          <p className="phis-empty-message">
            You don’t have any completed orders yet.
          </p>
        )}
      </div>
    </div>
    </div>
  );
};

export default OrderHistory;
