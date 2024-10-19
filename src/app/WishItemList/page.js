"use client";
import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useRouter } from "next/navigation";

import arrowleftIcon from "../images/arrow-left.png";
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const WishingItems = () => {
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

  const [activeKey, setActiveKey] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      setActiveKey(categories[0]._id);
    }
  }, [categories]);

  useEffect(() => {
    if (activeKey) {
      dispatch(fetchProductsByCategory(activeKey));
    }
  }, [activeKey, dispatch]);

  const handleSelect = (key) => {
    setActiveKey(key);
  };

  const productOnClick = (product) => {
    setSelectedProduct(product);
  };

  const handleSwipe = async () => {
    if (!selectedProduct) {
      alert("Please select a product first.");
      return;
    }
    const userData = localStorage.getItem("user");

    const uData = JSON.parse(userData);

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
          <small>₹5,000 - ₹10,000 Worth Items</small>
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
            <Button className="btn-swipe" block onClick={handleSwipe}>
              Swipe to Post My Wish <i className="bi bi-arrow-right"></i>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default WishingItems;
