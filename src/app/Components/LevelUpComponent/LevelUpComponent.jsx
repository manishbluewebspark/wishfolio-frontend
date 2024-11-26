"use client";
import React, { useEffect, useState } from "react";
import EmojiBadge from "./EmojiBadge";
import StatisticsLevelUp from "../../Components/LevelUpComponent/StatisticsLevelUp";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchUserData } from "../../store/slices/userSlice";
import { useRouter } from "next/navigation";
const LevelUpComponent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const [levelData, setLevelData] = useState(null);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     router.push("/orderhistorypage");
  //   }, 3000);

  //   // Cleanup the timer if the component unmounts
  //   return () => clearTimeout(timer);
  // }, [router]);
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
          setLevelData(response.data?.data);
        } catch (error) {
          console.error("Error fetching level data:", error);
        }
      }
    };

    fetchLevelData();
  }, [userData]);
  return (
    <div className="levelUpContainerLuc-main">
      <div className="levelUpContainerLuc">
        {/* Close Button */}
        {/* <button className="closeButtonLuc">✕</button> */}

        {/* Emoji Section */}
        <div className="emojiluc-sec">
          <EmojiBadge></EmojiBadge>
        </div>

        {/* Message Section */}
        <h3 className="levelUpTextLuc">Level Up!</h3>
        <p className="congratsTextLuc">
          Congratulations, you are now in Level {levelData?.labelName || "Tree"}
          .
        </p>

        {/* Wishing Items Section */}
        <StatisticsLevelUp levelData={levelData} />

        {/* Button */}
        <button className="donateButtonLuc" onClick={() => router.push("/")}>
          Start Contributing
        </button>
      </div>
    </div>
  );
};

export default LevelUpComponent;
