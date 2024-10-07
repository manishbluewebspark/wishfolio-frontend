'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './paymethod.css'; // Custom CSS file
import { Icon } from '@iconify/react';
import clipboardIcon from '@iconify/icons-mdi/clipboard'; // Importing specific MDI icon

const TransferPage = () => {
    return (
        <div className="container ta-dp-container">
            {/* Back Button */}
            <div className="ta-dp-header">
                <button className="ta-dp-back-btn">
                    ← Back
                </button>
            </div>

            {/* Bank Details Section */}
            <div className="ta-dp-input-section">
                <p className="ta-dp-title">You can transfer the money to the bank account below and submit your transaction ID.</p>

                {/* Account Information */}
                <div className=" d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <div className="ta-dp-label">Account Name</div>
                        <div className="ta-dp-balance">TRUETRADER APP PRIVATE LIMITED</div>
                    </div>
                    <div>
                        <span className="d-flex align-items-center">
                            <Icon icon={clipboardIcon} className="ta-dp-copy-icon" />
                        </span>
                    </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <div className="ta-dp-label">Account Number</div>
                        <div className="ta-dp-balance">16900200006420</div>
                    </div>
                    <div>
                        <span className="d-flex align-items-center">

                            <Icon icon={clipboardIcon} className="ta-dp-copy-icon" />
                        </span>
                    </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                    <span className="ta-dp-label">IFSC</span>
                    <span className="d-flex align-items-center">
                        <span className="ta-dp-balance">FDRL0001690</span>
                        <Icon icon={clipboardIcon} className="ta-dp-copy-icon" />
                    </span>
                    </div>
                    <div>
                    <span className="ta-dp-label">Bank Name</span>
                    <span className="d-flex align-items-center">
                        <span className="ta-dp-balance">Federal Bank</span>
                        <Icon icon={clipboardIcon} className="ta-dp-copy-icon" />
                    </span>
                    </div>
                </div>

           

                <div className="d-flex justify-content-between align-items-center mb-3">
                   <div>
                   <span className="ta-dp-label">Branch</span>
                    <span className="d-flex align-items-center">
                        <span className="ta-dp-balance">Kolathur</span>
                        <Icon icon={clipboardIcon} className="ta-dp-copy-icon" />
                    </span>
                   </div>
                   <div>
                   <span className="ta-dp-label">SWIFT Code</span>
                    <span className="d-flex align-items-center">
                        <span className="ta-dp-balance">FDRLINBBIBD</span>
                        <Icon icon={clipboardIcon} className="ta-dp-copy-icon" />
                    </span>
                   </div>
                </div>
            </div>

            {/* Amount and Commission Section */}
           <div className='ta-dp-amount-section p-4 rounded shadow-sm'>
           <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="ta-dp-label">Transferring Amount</span>
                <span className="ta-dp-balance">₹ 5,000</span>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="ta-dp-label">Platform Commission 15%</span>
                <span className="ta-dp-balance">₹ 750</span>
            </div>
           </div>

            {/* Total to Receive */}
            <div className="ta-dp-input-section-btm">
                <span className="ta-dp-final-amount">You Will Receive</span>
                <span className="ta-dp-final-amount-value">₹ 4,250</span>
            </div>
        </div>
    );
};

export default TransferPage;
