"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import BackButton from "../Components/Button/BackButton";
import searchIcon from "../images/search-normal.svg";
import {
  Container,
  Row,
  Col,
  Nav,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import productImage from "../images/watchimg.png";
// import "./wishitemlist.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/slices/categorySlice";
import {
  fetchProductsByCategory,
  selectProducts,
} from "../store/slices/productSlice";
import { fetchUserData } from "../store/slices/userSlice";
import axios from "axios";
import SwipeButton from "../Components/Comman/SwipeButton";
import { useRouter } from "next/navigation";
import CurrencyName from "../Components/Comman/CurrencyName";
import arrowleftIcon from "../images/arrow-left.png";
import LevelDropdown from "../Components/Comman/LevelDropdown";
import { SwipeableButton } from "react-swipeable-button";
import { fetchStatisticData } from "../store/slices/statisticSlice";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const WishingItems = () => {
  const swipeableButtonRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );
  const {
    products,
    loading: loadingProducts,
    error: errorProducts,
  } = useSelector(selectProducts);

  const { levels } = useSelector((state) => state.levels);
  const { statisticData } = useSelector((state) => state.statistic);
  const { userData } = useSelector((state) => state.user);
  const [activeKey, setActiveKey] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [levelIndex, setLevelIndex] = useState(null);
  const [minDonation, setMinDonation] = useState({});
  const [worthItem, setWorthItem] = useState("");

  useEffect(() => {
    const getUserData = () => {
      const user = localStorage.getItem("user");
      if (user) {
        const uData = JSON.parse(user);
        dispatch(fetchUserData(uData.id));
      }
    };
    getUserData();
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      setActiveKey(categories[0]._id);
    }
  }, [categories]);

  useEffect(() => {
    if (activeKey && userData) {
      dispatch(
        fetchProductsByCategory({
          categoryId: activeKey,
          userLevel: levelIndex ? levelIndex : userData?.userLevel,
        })
      );
    }
  }, [activeKey, dispatch, userData, levelIndex]);

  const handleSelect = (key) => {
    setActiveKey(key);
  };

  const productOnClick = (product) => {
    setSelectedProduct(product);
  };

  const handleSwipe = async () => {
    if (!selectedProduct) {
      swipeableButtonRef.current?.buttonReset();
      alert("Please select a product first.");

      return;
    }
    const userDatas = localStorage.getItem("user");

    const uData = JSON.parse(userDatas);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/wishDataRequest`,
        {
          productId: selectedProduct._id,
          userId: uData.id,
        }
      );
      if (response.status === 201) {
        router.push("/mywish");
      }
    } catch (error) {
      swipeableButtonRef.current?.buttonReset();
      console.error("Error posting wish:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };
  const handleBackClick = () => {
    router.push("/mywish");
  };
  const onSuccess = () => {
    handleSwipe();
  };
  const handleLevelChange = (levelIndex) => {
    // dispatch(
    //   fetchProductsByCategory({
    //     categoryId: activeKey,
    //     userLevel: levelIndex + 1,
    //   })
    // );

    if (levelIndex + 1 !== userData?.userLevel) {
      setShowMessage(true);
      setLevelIndex(levelIndex + 1);
      setMessage(
        "You have to complete your current level first in order to become eligible for these wishes."
      );
    } else {
      setShowMessage(false);
      setLevelIndex(levelIndex + 1);

      setMessage("");
    }
    setWorthItem(levels[levelIndex]?.worthItem);
  };
  const onFailure = () => {
    swipeableButtonRef.current?.buttonReset();
  };
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
      // const userData = localStorage.getItem("user");
      if (userData) {
        // const uData = JSON.parse(userData);
        dispatch(
          fetchStatisticData({
            id: userData._id,
            userLevel: userData.userLevel,
          })
        );
      }
    };

    getUserData();
  }, [dispatch, userData]);
  useEffect(() => {
    if (levels) {
      setWorthItem(levels[0]?.worthItem);
    }
  }, [levels]);
  const getSumOfAmounts = (donations) => {
    return donations?.reduce((total, donation) => total + donation.amount, 0);
  };
  function formatNumberWithCommas(number) {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <>
      <Container fluid className="wishing-item-main-con">
        {/* Header Section */}
        <div className="wishing-item-list-top-con">
          <div>
            <div className="wishing-item-list-btn-con">
              <BackButton></BackButton>
              <span>
                <h5 className="wishing-item-list-text-h5">Wishing Items</h5>
                <small className="wishing-item-list-subtext">{worthItem}</small>
              </span>
            </div>
          </div>
          <div>
            <LevelDropdown onLevelChange={handleLevelChange}></LevelDropdown>
          </div>
        </div>
        {/* Search Bar */}
        {/* <div className="wishing-item-search-input-con">
          <span>
            <Image src={searchIcon}></Image>
          </span>
          <input
            type="text"
            value=""
            onChange={""}
            placeholder="Search Item"
            className="wishing-item-search-input"
          />
          
        </div> */}

        {/* Dynamic Nav based on categories */}
        <Nav
          variant="pills"
          activeKey={activeKey}
          className="wishing-item-nav-con"
          onSelect={handleSelect}
        >
          {loading ? (
            <p>Loading categories...</p>
          ) : error ? (
            <p>Error loading categories: {error}</p>
          ) : (
            categories.map((category) => (
              <Nav.Item key={category._id} className="wishing-item-nav-item">
                <Nav.Link eventKey={category._id}>
                  {category.categoryName}
                </Nav.Link>
              </Nav.Item>
            ))
          )}
        </Nav>

        {/* Product Grid */}
        <Row>
          {loadingProducts ? (
            <p>Loading products...</p>
          ) : errorProducts ? (
            <p>Error loading products: {errorProducts}</p>
          ) : products.length === 0 ? ( // Check if products array is empty
            <Col>
              <p>No products found.</p>
            </Col>
          ) : (
            products.map((product) => (
              <Col
                xs={4}
                className="mb-3"
                key={product.id}
                onClick={() => productOnClick(product)}
              >
                <div
                  className={`wishingitem-product-card text-center ${
                    selectedProduct?._id === product._id ? "selected" : ""
                  }`}
                >
                  <Image
                    src={
                      `${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${product.productImageUrl}` ||
                      productImage
                    } // Use actual product image
                    width={89}
                    height={99.81}
                    alt={product.productName}
                    className=""
                  />
                </div>
                <p
                  className="mt-2 wishing-item-pro-text"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.productName}
                </p>
                <p className="mt-0 wishing-item-pro-text">
                  <CurrencyName />{" "}
                  {formatNumberWithCommas(product.productPrice)}
                </p>
              </Col>
            ))
          )}
        </Row>

        {/* Swipe to Post My Wish */}
        {/* <Row className="fixed-bottom">
        <Col>
          <div className="text-center">
            <div style={{ width: "70%", display: "block", margin: "auto" }}>
              <SwipeableButton
                onSuccess={onSuccess}
                onFailure={onFailure}
                text="Swipe to Post My Wish"
                text_unlocked="Swiped "
                sliderColor="#e7f0ff"
                sliderTextColor="#000"
                sliderIconColor="#000"
                background_color="#90AEFF"
                borderRadius={30}
                circle
                autoWidth
                disabled={false}
                name="react-swipeable-button"
                ref={swipeableButtonRef}
              />
            </div>
          </div>
        </Col>
      </Row>  */}
      </Container>
      <div className="swip-btn-sticky">
        {(showMessage ||
          getSumOfAmounts(statisticData?.data) <
            minDonation?.minimumDonation) && (
          <div className="message-container">
            <div className="message-box">
              <span className="message-icon">🔒</span>
              <p>
                You have to complete your current level first in order to become
                eligible for these wishes.
              </p>
            </div>
          </div>
        )}
        {!showMessage &&
          getSumOfAmounts(statisticData?.data) >=
            minDonation?.minimumDonation && (
            <SwipeButton
              handleSwipe={handleSwipe}
              isSwipable={!!selectedProduct}
            ></SwipeButton>
          )}
      </div>
    </>
  );
};

export default WishingItems;
