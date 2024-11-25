import React from "react";
import Image from "next/image";
import userImage from "../../images/1userAvatar.jpg"; // Add user profile image
import { ProgressBar, Row, Col, Button } from "react-bootstrap";
import styles from "./style.css";
import { useRouter } from "next/navigation";
import CurrencyName from "../Comman/CurrencyName";
import rightIcon from '../../images/ep_success-filled.svg'
const ProductPage = ({ product }) => {
  const router = useRouter();
  const getSumOfAmounts = (donations) => {
    return donations?.reduce((total, donation) => total + donation.amount, 0);
  };

  const calculatePercentageOfAmount = (specifiedAmount) => {
    const totalAmount = getSumOfAmounts(product?.donationsDetails);
    const percentage = ((totalAmount / specifiedAmount) * 100).toFixed(2);
    return percentage;
  };

  const filterDonationsByDate = (donations, filterType) => {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);

    switch (filterType) {
      case "today":
        return donations?.filter((donation) => {
          const createdAt = new Date(donation.createdAt);
          return createdAt >= startOfToday;
        });
      case "yesterday":
        return donations?.filter((donation) => {
          const createdAt = new Date(donation.createdAt);
          return createdAt < startOfToday && createdAt >= startOfYesterday;
        });
      case "remaining":
        return donations?.filter((donation) => {
          const createdAt = new Date(donation.createdAt);
          return createdAt < startOfYesterday;
        });
      default:
        return donations; // Return all if no valid filter is provided
    }
  };

  const todayDonations = filterDonationsByDate(
    product?.donationsDetails,
    "today"
  );
  const yesterdayDonations = filterDonationsByDate(
    product?.donationsDetails,
    "yesterday"
  );
  const remainingDonations = filterDonationsByDate(
    product?.donationsDetails,
    "remaining"
  );

  function getDateAndTimeFromISO(isoString) {
    const dateObj = new Date(isoString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = dateObj.toLocaleDateString("en-GB", options);
    const time = dateObj.toISOString().split("T")[1].split(".")[0];
    return { date: formattedDate, time };
  }

  const totalDonated = getSumOfAmounts(product?.donationsDetails);
  const progressVariant =
    totalDonated >= product?.productPrice ? "success" : "info";
  const handleSubmitForDelivery = () => {
    router.push("/submitForDelivery");
  };
  return (
    <div className={`my-wish-prod-con ${styles.container}`}>
      {/* WishFolio Header */}
      {/* <div className="d-flex justify-content-end align-items-center share-btn-con">
        <button className="">Share</button>
      </div> */}

      {/* Product Details Section */}
      <div className="text-center my-wish-prod-img">
        <Image
          src={`${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${product?.productImageUrl}`}
          alt={product?.productName}
          width={187.41}
          height={210.16}
          className="postmywish-img"
        />
        <h5 className="mywish-pro-text">{product?.productName}</h5>
        <p className="mywish-pro-subtext">
          <strong style={{ color: "#000000", fontSize:'14px'}}>
            <CurrencyName />
            {totalDonated || 0}
          </strong>
          / <CurrencyName />
          {product?.productPrice?.toLocaleString()} Donated
        </p>

        {/* Progress Bar */}
        <ProgressBar
          now={calculatePercentageOfAmount(product?.productPrice)}
          //   variant={progressVariant}
          className={`${progressVariant} mywish-pro-progress`}
        />
      </div>

      {/* Donations Section */}

      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center my-wish-pro-date-con">
          <h6 className="mywish-pro-today">Today</h6>
          <div className="">
            <span className="mx-2">Received</span>
            <span className="fw-bold">
              <CurrencyName />
              {getSumOfAmounts(todayDonations)}
            </span>
          </div>
        </div>

        {todayDonations?.map((item) => (
          <DonationCard
            key={item._id}
            name={item.donorName || "Unknown Donor"}
            date={getDateAndTimeFromISO(item?.updatedAt)?.date}
            time={getDateAndTimeFromISO(item?.updatedAt)?.time}
            amount={`${item.amount?.toLocaleString()}`}
            image={
              item.donorImage
                ? `${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${item.donorImage}`
                : userImage
            }
          />
        ))}
      </div>

      {/* Yesterday Donations Section */}
      {yesterdayDonations.length > 0 && (
        <div className="mb-4">
          <h6>Yesterday</h6>
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mywish-pro-today">Yesterday</h6>
            <p className="fw-bold">
              <CurrencyName />
              {getSumOfAmounts(yesterdayDonations) || 0}
            </p>
          </div>
          {yesterdayDonations?.map((item) => (
            <DonationCard
              key={item._id}
              name={item.donorName || "Unknown Donor"}
              date={new Date(item.createdAt).toLocaleDateString()}
              time={new Date(item.createdAt).toLocaleTimeString()}
              amount={`${item.amount?.toLocaleString()}`}
              image={
                item.donorImage
                  ? `${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${item.donorImage}`
                  : userImage
              }
            />
          ))}
        </div>
      )}
      {remainingDonations?.length > 0 && (
        <div className="mb-4">
          <h6>Previous</h6>
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mywish-pro-today">Previous</h6>
            <p className="fw-bold">
              <CurrencyName />
              {getSumOfAmounts(remainingDonations) || 0}
            </p>
          </div>
          {remainingDonations?.map((item) => (
            <DonationCard
              key={item._id}
              name={item.donorName || "Unknown Donor"}
              date={new Date(item.createdAt).toLocaleDateString()}
              time={new Date(item.createdAt).toLocaleTimeString()}
              amount={`${item.amount?.toLocaleString()}`}
              image={
                item.donorImage
                  ? `${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${item.donorImage}`
                  : userImage
              }
            />
          ))}
        </div>
      )}
      {remainingDonations?.length === 0 && yesterdayDonations.length === 0 && todayDonations?.length === 0 &&(
        <div className="mywish-pro-text-view-con">
          <p className="my-wish-text-view">You don't have any donation yet</p>
        </div>
      )}
      {progressVariant === "success" && (
        <Row className="fixed-bottom-btn-delivery">
          <Col>
            <div className="text-center">
              <Button
                className="btn-swipe w-100"
                block
                onClick={handleSubmitForDelivery}
              >
                Submit for Delivery
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

// DonationCard component
const DonationCard = ({ name, date, time, amount, image }) => {
  return (
    <div className="mywish-pro-donation-card">
      <div className="w-100 d-flex align-items-center justify-content-between">
       <div className="d-flex align-items-center justify-content-center">
       <Image
          src={image}
          alt="User Image"
          className="rounded-circle"
          width={42}
          height={42}
        />
        <div className="ms-1">
          <h6 className="mb-0 pro-wish-head-text" >
            {name} <span className="text-success">
              <Image src={rightIcon} height={15} width={15}></Image>
            </span>
          </h6>
          <p className=" small clas pro-wish-head-subtexttext">
            {date} • {time}
          </p>
        </div>
       </div>
        <div className="ms-auto">
          <p className="text-success fw-bold my-wish-pro-amount">
            +<CurrencyName />
            {amount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
