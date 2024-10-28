"use client";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./style.css"; // Custom CSS file for styling
import Image from "next/image";
import icon1 from "../../images/dollar-circle.png";
import icon2 from "../../images/drop.png";
import iconTick from "../../images/tick-circle.png";
import CurrencyName from "../Comman/CurrencyName";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchStatisticData,
  clearStatisticData,
} from "../../store/slices/statisticSlice";
import { fetchLevels } from "../../store/slices/levelsSlice";
import { fetchUserData } from "../../store/slices/userSlice";
import axios from "axios";
const Statistics = (props) => {
  const dispatch = useDispatch();
  const { statisticData } = useSelector((state) => state.statistic);
  const [minDonation, setMinDonation] = useState({});
  const { levels, loading } = useSelector((state) => state.levels);
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchLevels());
  }, [dispatch]);

  // useEffect(() => {
  //   if (levels?.length > 0) {
  //     setMinDonation(levels[0]);
  //   }
  // }, [levels, statisticData]);
  useEffect(() => {
    // Fetch user data from localStorage and Redux on component mount
    const getUserData = () => {
      const user = localStorage.getItem("user");
      if (user) {
        const uData = JSON.parse(user);
        dispatch(fetchUserData(uData.id)); // Fetch data using user ID from localStorage
      }
    };
    getUserData();
  }, [dispatch]);
  useEffect(() => {
    // Fetch level data based on user level
    const fetchLevelData = async () => {
      if (userData?.userLevel) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/level/byUser/${userData.userLevel}`
          );
          setMinDonation(response.data?.data);
        } catch (error) {
          console.error("Error fetching level data:", error);
        }
      }
    };

    fetchLevelData();
  }, [userData]);
  useEffect(() => {
    const getUserData = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const uData = JSON.parse(userData);
        dispatch(fetchStatisticData(uData.id));
      }
    };

    getUserData();
  }, [dispatch]);

  const getSumOfAmounts = (donations) => {
    return donations?.reduce((total, donation) => total + donation.amount, 0);
  };

  function formatNumberWithCommas(number) {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div
      className="mw-statistics-section shadow-sm"
      style={{
        background: props?.isPayment
          ? "#F7F7F7"
          : statisticData?.data?.length >= minDonation.numberOfDonations &&
            getSumOfAmounts(statisticData?.data) >= minDonation?.minimumDonation
          ? "#31B776"
          : "#90AEFF",
      }}
    >
      <div className="mw-statistics-inside-sec">
        <div className="mw-content-inside-sec">
          <h5 className="mw-statistics-title">My Statistic</h5>
          <p
            className="mw-description"
            style={{ display: props?.isPayment ? "none" : "block" }}
          >
            {statisticData?.data?.length >= minDonation.numberOfDonations &&
            getSumOfAmounts(statisticData?.data) >= minDonation?.minimumDonation
              ? "Congrats! you are now eligible."
              : "Once you finish you will be eligible to post your dream wish item."}
          </p>
        </div>
        <div className="mw-content-inside-sec2">
          <div
            className="mw-stat-item"
            style={{
              background: props?.isPayment
                ? "#EEEEEE"
                : statisticData?.data?.length >=
                    minDonation.numberOfDonations &&
                  getSumOfAmounts(statisticData?.data) >=
                    minDonation?.minimumDonation
                ? "#ffffff"
                : "#AEC4FF",
            }}
          >
            <Image
              src={
                getSumOfAmounts(statisticData?.data) >=
                minDonation?.minimumDonation
                  ? iconTick
                  : icon2
              }
              alt="dollar-circle"
              width={24}
              height={24}
              className="mw-icon"
            ></Image>
            <div className="mw-stat-text d-flex justify-content-between w-100 align-items-center">
              <span
                style={{
                  textDecoration:
                    getSumOfAmounts(statisticData?.data) >=
                    minDonation?.minimumDonation
                      ? "line-through"
                      : "none",
                }}
              >
                Min Donations
              </span>
              <h6
                style={{
                  textDecoration:
                    getSumOfAmounts(statisticData?.data) >=
                    minDonation?.minimumDonation
                      ? "line-through"
                      : "none",
                }}
              >
                <CurrencyName />
                {formatNumberWithCommas(getSumOfAmounts(statisticData?.data))}/
                {formatNumberWithCommas(minDonation?.minimumDonation)}
              </h6>
            </div>
          </div>

          <div
            className="mw-stat-item "
            style={{
              background: props?.isPayment
                ? "#EEEEEE"
                : statisticData?.data?.length >=
                    minDonation.numberOfDonations &&
                  getSumOfAmounts(statisticData?.data) >=
                    minDonation?.minimumDonation
                ? "#ffffff"
                : "#AEC4FF",
            }}
          >
            {/* Conditionally render icon based on donations count */}
            <Image
              src={
                statisticData?.data?.length >= minDonation.numberOfDonations
                  ? iconTick
                  : icon2
              }
              alt="donation-status-icon"
              width={24}
              height={24}
              className="mw-icon"
            ></Image>
            <div className="mw-stat-text d-flex justify-content-between w-100 align-items-center">
              <span
                style={{
                  textDecoration:
                    statisticData?.data?.length >= minDonation.numberOfDonations
                      ? "line-through"
                      : "none",
                }}
              >
                Number of Donations
              </span>
              <h6
                style={{
                  textDecoration:
                    statisticData?.data?.length >= minDonation.numberOfDonations
                      ? "line-through"
                      : "none",
                }}
              >
                {statisticData?.data?.length}/{minDonation.numberOfDonations}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
