"use client";
import React, { useState, useEffect } from "react";
import BackButton from "../Components/Button/BackButton";
import Image from "next/image";
import logoIcon from "../images/Snow.svg";
import axios from "axios"; // Import axios
const TermsAndConditions = () => {
  const [data, setData] = useState(null); // State to store API data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // API call using axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/content` // Example API URL
        );

        const filtered = response.data?.data.find(
          (item) => item.type === "Privacy Policy"
        );

        setData(filtered); // Set the API data
        setLoading(false); // Set loading to false when data is fetched
      } catch (err) {
        setError("Failed to fetch data."); // Handle error
        setLoading(false); // Set loading to false if error occurs
      }
    };

    fetchData(); // Call the API when the component mounts
  }, []);

  // Show loading spinner or message while fetching data
  if (loading) {
    return <p>Loading...</p>;
  }

  // Show error message if the API call fails
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <BackButton title={"Privacy Policy"} />
      <div className="tac-privacy-policy-container container">
        <div className="tac-privacy-policy-content">
          <a
            className="navbar-brand tac-privacy-policy-brand d-flex align-items-center"
            href="#"
          >
            <Image src={logoIcon} alt="WishFolio Logo" width={32} height={32} />
            <span className="brand-text">
              Wish<span className="highlight-text">Folio</span>
            </span>
          </a>

          {/* Use API data */}
          <p className="tac-text">{data?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
