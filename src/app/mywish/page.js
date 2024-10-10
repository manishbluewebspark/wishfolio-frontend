import "bootstrap/dist/css/bootstrap.min.css";
import "./mywish.css"; // Custom CSS file for styling
import Image from "next/image";
import icon1 from "../images/dollar-circle.png";
import icon2 from "../images/drop.png";
import icon3 from "../images/lovely.png";
import img2 from "../images/91.png";
import Statistics from "../Components/mystatistics/Statistics";
import Myorder from "../Components/mystatistics/Myorder";

const WishFolio = () => {
  return (
    <>
      <div className="container-mw">
        {/* Statistics Section */}
        <Statistics></Statistics>
        {/* {my order section } */}
        <Myorder></Myorder>
        {/* Donation Section */}
        <div className="mw-donation-section-con">
          <div className="mw-donation-section">
            <Image
              src={img2}
              height={75}
              width={100}
              className="mw-donate-img"
            ></Image>
            <h5>More to Donate</h5>
            <p>
              You are currently not eligible for this Wish. Please complete your
              statistics to proceed.
            </p>
            <button className="btn mw-donate-btn">Donate Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishFolio;
