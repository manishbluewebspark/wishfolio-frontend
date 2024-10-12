"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./mywish.css"; // Custom CSS file for styling
import Image from "next/image";
import img2 from "../images/91.png";
import Statistics from "../Components/mystatistics/Statistics";
import Myorder from "../Components/mystatistics/Myorder";
import { useRouter } from "next/navigation";
const WishFolio = () => {
  const router = useRouter();
  const { statisticData } = useSelector((state) => state.statistic);
  const { levels } = useSelector((state) => state.levels);
  const [minDonation, setMinDonation] = useState({});

  useEffect(() => {
    if (levels?.length > 0) {
      setMinDonation(levels[0]);
    }
  }, [levels, statisticData]);
  const getSumOfAmounts = (donations) => {
    return donations?.reduce((total, donation) => total + donation.amount, 0);
  };
  return (
    <>
      <div className="container-mw">
        <Statistics />

        <Myorder />

        <div className="mw-donation-section-con">
          <div className="mw-donation-section">
            <Image
              src={img2}
              height={75}
              width={100}
              alt="Donation Image"
              className="mw-donate-img"
            />
            <h5>More to Donate</h5>
            <p>
              You are currently not eligible for this Wish. Please complete your
              statistics to proceed.
            </p>
            {statisticData?.data?.length >= minDonation.numberOfDonations &&
            getSumOfAmounts(statisticData?.data) >=
              minDonation?.minimumDonation ? (
              <button
                className="btn post-mywish-btn"
                onClick={() => router.push("/WishItemList")}
              >
                Post My Wish!
              </button>
            ) : (
              <button className="btn mw-donate-btn donate-btn">
                Donate Now
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishFolio;
