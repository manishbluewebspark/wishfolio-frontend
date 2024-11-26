"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import img2 from "../images/71.svg";
import Statistics from "../Components/mystatistics/Statistics";
import Myorder from "../Components/mystatistics/Myorder";
import { useRouter } from "next/navigation";
import { fetchMyWish } from "../store/slices/myWishSlice";
import Product from "../Components/myWish/Product";
import { fetchUserData } from "../store/slices/userSlice";
import LoginComponent from "../Components/LoginComponent/LoginComponent"; // Import LoginComponent
import axios from "axios";

const WishFolio = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { statisticData } = useSelector((state) => state.statistic);
  const { levels } = useSelector((state) => state.levels);
  const { wishData, isLoading, error } = useSelector(
    (state) => state.myWishData
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if user is logged in
  const [minDonation, setMinDonation] = useState({});

  useEffect(() => {
    // Fetch user data from localStorage and Redux on component mount
    const getUserData = () => {
      const user = localStorage.getItem("user");
      if (user) {
        const uData = JSON.parse(user);
        setIsLoggedIn(true); // Set the user as logged in
        dispatch(fetchUserData(uData.id)); // Fetch data using user ID from localStorage
      } else {
        setIsLoggedIn(false); // Set the user as not logged in
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

  // Fetch user's wish data on component mount
  useEffect(() => {
    const getUserData = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const uData = JSON.parse(userData);
        dispatch(fetchMyWish(uData.id));
      }
    };
    getUserData();
  }, [dispatch]);

  // Function to calculate total donations
  const getSumOfAmounts = (donations) => {
    return donations?.reduce((total, donation) => total + donation.amount, 0);
  };

  // Condition to check whether the user can post a wish
  const canPostWish =
    getSumOfAmounts(statisticData?.data) >= minDonation?.minimumDonation;

  // If user is not logged in, show the LoginComponent
  if (!isLoggedIn) {
    return <LoginComponent />;
  }

  return (
    <>
      {!isLoading &&
      !error &&
      wishData?.data &&
      wishData?.data?.ordersDetails?.length === 0 ? (
        <>
          <Product
            product={wishData.data}
            showModal={true}
            minDonation={minDonation}
            handleClose={() => {}}
            openSuccessModal={() => {}}
          />
        </>
      ) : (
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
                <h5>Almost there!</h5>
                <p>
                You can share your wish with the community
                once you've completed your contributions
                </p>

                {canPostWish ? (
                  <button
                    className="post-mywish-btn"
                    onClick={() => router.push("/WishItemList")}
                  >
                    Post My Wish!
                  </button>
                ) : (
                  <button
                    className="mw-donate-btn-disable"
                    //onClick={() => router.push("/")}
                    disabled
                  >
                    Post My wish!
                  </button>
                )}
                <p
                  className="mw-donate-explore-txt"
                  onClick={() => router.push("/WishItemList")}
                >
                  Explore Wishing Items
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default WishFolio;
