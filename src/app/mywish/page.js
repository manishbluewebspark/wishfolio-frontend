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
const WishFolio = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { statisticData } = useSelector((state) => state.statistic);
  const { levels } = useSelector((state) => state.levels);
  const { wishData, isLoading, error } = useSelector(
    (state) => state.myWishData
  );

  const [minDonation, setMinDonation] = useState({});

  // Set minimum donation requirement based on levels
  useEffect(() => {
    if (levels?.length > 0) {
      setMinDonation(levels[0]);
    }
  }, [levels]);

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
    statisticData?.data?.length >= minDonation.numberOfDonations &&
    getSumOfAmounts(statisticData?.data) >= minDonation?.minimumDonation;

  return (
    // <>
    //   {!isLoading && !error && wishData?.data ? (
    //     <>
    //       <Product
    //         product={wishData.data}
    //         showModal={true}
    //         minDonation={minDonation}
    //         handleClose={() => {}}
    //         openSuccessModal={() => {}}
    //       />
    //     </>
    //   ) : (
    //     <>
    //       <div className="container-mw">
    //         <Statistics />
    //         <Myorder />
    //         <div className="mw-donation-section-con">
    //           <div className="mw-donation-section">
    //             <Image
    //               src={img2}
    //               height={75}
    //               width={100}
    //               alt="Donation Image"
    //               className="mw-donate-img"
    //             />
    //             <h5>Almost there!</h5>
    //             <p>
    //             You will be eligible to post your wish after you complete your donations.
    //             </p>

                
    //             {canPostWish ? (
    //               <button
    //                 className="post-mywish-btn"
    //                 onClick={() => router.push("/WishItemList")}
    //               >
    //                 Post My Wish!
    //               </button>
    //             ) : (
    //               <button
    //                 className="mw-donate-btn"
    //                 onClick={() => router.push("/")}
    //               >
    //                 Post My wish
    //               </button>
    //             )}
    //             <p className="mw-donate-explore-txt">Explore Wishing Items</p>
    //           </div>
    //         </div>
    //       </div>
    //     </>
    //   )}
    // </>
    <>
    
    </>
  );
};

export default WishFolio;
