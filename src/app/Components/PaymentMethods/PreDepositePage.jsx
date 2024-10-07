'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './paymethod.css'; // Custom CSS file

const PreDepositPage = () => {
    return (
        <div className="pta-container">
            {/* Transaction ID Input Section */}
            <div className="pta-input-section">
                <div className="pta-title">Enter Transaction ID</div>
                
                <input 
                    type="text" 
                    className="pta-input" 
                    placeholder="Transaction ID" 
                />

                <a href="#" className="pta-upload-link">Add Screenshot here</a>
                
                <p className="pta-description">
                    Once you transferred the amount, please enter your transaction ID here.
                </p>

                <button className="pta-submit-btn">Submit</button>
            </div>

            {/* Divider */}
            <div className="pta-divider">
                <span className="pta-divider-text">OR</span>
            </div>

            {/* New Deposit Section */}
            <div className="pta-deposit-section">
                <div className="pta-deposit-title">Make a New Deposit</div>
                
                <p className="pta-deposit-description">
                    Create a new deposit transaction exclusively for users to add funds to your Wishfolio account.
                </p>

                <button className="pta-deposit-btn">Deposit</button>
            </div>
        </div>
    );
};

export default PreDepositPage;
