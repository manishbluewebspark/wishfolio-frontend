"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios"; // Import Axios
import "./orderhistory.css";
import img2 from "../../images/86.png";

const RatingModal = ({ isModalOpen, closeModal, order }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("orderId", order._id); // If you need to send the order ID

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/order/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload successful", response.data);
      alert("File uploaded successfully!");
      closeModal(); // Close modal after upload
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  return (
    <div
      className={`bottom-modal ${isModalOpen ? "open" : ""}`}
      style={{ height: "80vh" }}
    >
      <div className="modal-content text-center">
        <div className="modal-header">
          <button onClick={closeModal} className="close-btn">
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="phis-thumbnil">
            <Image
              src={`${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${order.productImageUrl}`}
              alt="Product"
              className="img-fluid phis-product-image"
              width={56.89}
              height={63.8}
              layout="responsive"
            />
          </div>
          <Image src={img2} alt={"title"} width={100} height={100} />
          <div className="product-details">
            <p className="success-heading">We Love Feedback!</p>

            <p className="success-title">
              We’ve received your wish product request. It will be delivered to
              your address within <strong>2-14 working days</strong>. Once you
              receive your product, please share your review with us.
            </p>

            <div className="upload-btn mt-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: "none" }}
                id="file-upload"
              />
              <label htmlFor="file-upload" className="pta-upload-link">
                Upload Product Image
              </label>
            </div>
            <div className="rate-btn mt-4">
              <button className="btn-primary" onClick={handleUpload}>
                Rate Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
