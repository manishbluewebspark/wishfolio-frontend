import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'; // Import your custom CSS

const StatisticsPage = () => {
  return (
    <div className="container-mdn mt-4">
      {/* Statistics Section */}
      <div className="mdn-statistics-section p-4 rounded shadow-sm">
        <h5 className="mdn-statistics-title">My Statistic</h5>
        <p className="mdn-description">
          Once you finish you will be eligible to post your dream wish item.
        </p>
        <div className="mdn-statistics-details d-flex justify-content-between">
          <div>
            <span className="mdn-stat-text">Min Donations</span>
            <h6 className="mdn-stat-value">₹4,500 / 10,000</h6>
          </div>
          <div>
            <span className="mdn-stat-text">Number of Donations</span>
            <h6 className="mdn-stat-value">4 / 10</h6>
          </div>
        </div>
      </div>

      {/* Donation Summary */}
      <div className="mdn-donation-summary d-flex justify-content-between align-items-center mt-4 mb-3">
        <h6 className="mdn-summary-title">Today</h6>
        <h6 className="mdn-summary-value">Donated ₹4,500</h6>
      </div>

      {/* Donations Section */}
      <div className="row mdn-donations">
        {/* Donation Card 1 */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm mdn-card">
            <div className="card-body">
              <div className="mdn-funding-status">Funding</div>
              <img
                src="/images/apple_watch.jpg"
                alt="Apple Watch"
                className="img-fluid mb-3 mdn-product-image"
              />
              <h6 className="mdn-wish-text">Wish by Sinan CP</h6>
              <p className="mdn-donation-value">₹34,000 / ₹54,990 Donated</p>
              <p className="mdn-product-description">SONY PlayStation 5 console</p>
              <button className="btn btn-primary btn-sm w-100 mdn-donate-btn">+₹2,400</button>
            </div>
          </div>
        </div>

        {/* Donation Card 2 */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm mdn-card">
            <div className="card-body">
              <div className="mdn-success-status">Success</div>
              <img
                src="/images/samsung_phone.jpg"
                alt="Samsung Phone"
                className="img-fluid mb-3 mdn-product-image"
              />
              <h6 className="mdn-wish-text">Wish by Sinan CP</h6>
              <p className="mdn-donation-value">₹34,000 / ₹54,990 Donated</p>
              <p className="mdn-product-description">SONY PlayStation 5 console</p>
              <button className="btn btn-success btn-sm w-100 mdn-view-story-btn">View Story</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
