"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
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
import { useRouter } from "next/navigation";
import CurrencyName from "../Components/Comman/CurrencyName";
import arrowleftIcon from "../images/arrow-left.png";
import { SwipeableButton } from "react-swipeable-button";
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
  const { userData } = useSelector((state) => state.user);
  const [activeKey, setActiveKey] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

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
          userLevel: userData?.userLevel,
        })
      );
    }
  }, [activeKey, dispatch, userData]);

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
        router.push("/WishConfirmation");
      }
      console.log("Wish posted successfully:", response.data);
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

  const onFailure = () => {
    console.log("Failed to Swipe!");
    swipeableButtonRef.current?.buttonReset();
  };

  return (
    <Container fluid className="p-3">
      {/* Header Section */}
      <Row className="align-items-center mb-3">
        <Col xs="auto p-0">
          <button className="dp-back-btn" onClick={handleBackClick}>
            <Image
              src={arrowleftIcon}
              width={24}
              height={24}
              alt="Arrow Left Icon"
              className="mx-2"
            />
          </button>
        </Col>
        <Col className="p-0">
          <h5 className="mb-0">Wishing Items</h5>
          <small>5,000 - ₹10,000 Worth Items</small>
        </Col>
      </Row>

      {/* Search Bar */}
      <Row className="mb-3">
        <Col>
          <InputGroup>
            <Form.Control
              placeholder="Search Item"
              aria-label="Search Item"
              aria-describedby="search-button"
            />
          </InputGroup>
        </Col>
      </Row>

      {/* Dynamic Nav based on categories */}
      <Nav
        variant="pills"
        activeKey={activeKey}
        className="mb-3"
        onSelect={handleSelect}
      >
        {loading ? (
          <p>Loading categories...</p>
        ) : error ? (
          <p>Error loading categories: {error}</p>
        ) : (
          categories.map((category) => (
            <Nav.Item key={category._id}>
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
                className={`product-card text-center ${
                  selectedProduct?._id === product._id ? "selected" : ""
                }`}
              >
                <Image
                  src={
                    `${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${product.productImageUrl}` ||
                    productImage
                  } // Use actual product image
                  width={100}
                  height={100}
                  alt={product.productName}
                  className="img-fluid"
                />
              </div>
              <p className="mt-2">{product.productName}</p>
            </Col>
          ))
        )}
      </Row>

      {/* Swipe to Post My Wish */}
      <Row className="fixed-bottom">
        <Col>
          <div className="text-center">
            {/* <Button className="btn-swipe" block onClick={handleSwipe}>
              Swipe to Post My Wish <i className="bi bi-arrow-right"></i>
            </Button> */}
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
      </Row>
    </Container>
  );
};

export default WishingItems;
