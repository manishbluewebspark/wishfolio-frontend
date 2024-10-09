import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"; // Custom CSS file for styling
import Image from "next/image";
import icon1 from "../../images/dollar-circle.png";
import icon2 from "../../images/drop.png";
// import img2 from '../../images/91.png';

const Statistics = (props) => {
  return (
    <div
      className="mw-statistics-section  shadow-sm"
      style={{ background: props?.isPayment ? "#F7F7F7" : "#90AEFF" }}
    >
      <div className="mw-statistics-inside-sec">
        <div className="mw-content-inside-sec">
          <h5 className="mw-statistics-title">My Statistic</h5>
          <p
            className="mw-description"
            style={{ display: props?.isPayment ? "none" : "block" }}
          >
            Once you finish you will be eligible to post your dream wish item.
          </p>
        </div>
        <div className="mw-content-inside-sec2">
          <div
            className="mw-stat-item"
            style={{ background: props?.isPayment ? "#EEEEEE" : "#AEC4FF" }}
          >
            <Image
              src={icon1}
              alt="dollar-circle"
              width={24}
              height={24}
              className="mw-icon"
            ></Image>
            <div className="mw-stat-text d-flex justify-content-between w-100 align-items-center">
              <span>Min Donations</span>
              <h6>
                ₹{props?.minDonation} / {props.price}
              </h6>
            </div>
          </div>
          <div
            className="mw-stat-item"
            style={{ background: props?.isPayment ? "#EEEEEE" : "#AEC4FF" }}
          >
            <Image
              src={icon2}
              alt="dollar-circle"
              width={24}
              height={24}
              className="mw-icon"
            ></Image>
            <div className="mw-stat-text d-flex justify-content-between w-100 align-items-center">
              <span>Number of Donations</span>
              <h6>
                {props.remaningDonation} / {props.numberOfDoanation}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
