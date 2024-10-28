"use client";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import Image from "next/image";
import treeIcon from "../images/emoji2.png"; // replace with your icon path
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchUserData } from "../store/slices/userSlice";
import { useRouter } from "next/navigation";
const LevelUpScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const [levelData, setLevelData] = useState(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/orderhistorypage");
    }, 3000);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [router]);
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
    <div className="justify-content-center align-items-center custome-class-levelup min-vh-100 d-flex">
      <Row className="text-center w-100" style={{ maxWidth: "500px" }}>
        <Col xs={12}>
          {/* Close Button */}
          <div className="d-flex justify-content-end mb-2">
            <Button
              variant="link"
              className="text-dark"
              style={{ fontSize: "1.5rem" }}
            >
              &times;
            </Button>
          </div>

          {/* Icon and Title */}
          <div className="mb-4">
            <Image
              src={treeIcon}
              alt="Tree Icon"
              width={80}
              height={80}
              className="rounded-circle mb-2"
            />
            <h5 className="mb-0">{levelData?.labelName || "Tree"}</h5>
          </div>

          {/* Level Up Message */}
          <h3>Level Up!</h3>
          <p>
            Congratulations, you are now in Level{" "}
            {levelData?.labelName || "Tree"}.
          </p>

          {/* Wishing Items Section */}
          <Card
            className="my-4 p-3"
            style={{ backgroundColor: "#e8f7e4", borderRadius: "15px" }}
          >
            <h5 className="font-weight-bold">Wishing Items</h5>
            <p className="text-muted">
              {levelData?.minimumDonation && levelData?.worthItem
                ? `₹${levelData.minimumDonation} - ₹${levelData.worthItem} Worth Items`
                : "Loading..."}
            </p>
            <h6 className="text-success">Target to be completed</h6>

            {/* Targets */}
            <Row className="justify-content-center mt-3">
              <Col xs={10}>
                <Card
                  className="my-2 p-3 d-flex flex-row align-items-center justify-content-between"
                  style={{ backgroundColor: "#f2f4f7", borderRadius: "10px" }}
                >
                  <span className="d-flex align-items-center">
                    <i className="bi bi-currency-dollar text-dark mr-2"></i> Min
                    Donations
                  </span>
                  <span>₹{levelData?.minimumDonation}</span>
                </Card>
                <Card
                  className="my-2 p-3 d-flex flex-row align-items-center justify-content-between"
                  style={{ backgroundColor: "#f2f4f7", borderRadius: "10px" }}
                >
                  <span className="d-flex align-items-center">
                    <i className="bi bi-droplet-half text-dark mr-2"></i> Number
                    of Donations
                  </span>
                  <span>{levelData?.numberOfDonations}</span>
                </Card>
              </Col>
            </Row>
          </Card>

          {/* Start Donating Button */}
          <Button
            variant="primary"
            size="lg"
            className="px-4 py-2 rounded-pill mt-3"
            onClick={() => router.push("/")}
          >
            Start Donating
          </Button>
        </Col>
      </Row>

      {/* Custom Styles */}
      <style jsx>{`
        .card {
          border: none;
        }
        .rounded-circle {
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default LevelUpScreen;
