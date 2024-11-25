import React, { useEffect, useState } from "react";
// import './style.css';
import Image from "next/image";
import logo from "../../images/snow.png";
import logoIcon from "../../images/Snow.svg"; // Replace with your logo
import { useRouter } from "next/navigation";
import crossicon from "../../images/cross.svg";
import img2 from "../../images/86.svg";
import uploadIcon from "../../images/ion_attach.svg";
import attachRemoveicon from "../../images/IconSet2.svg";
import axios from "axios";
const LoginModal = ({ isOpen, onClose, onConfirm, order }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const removeFile = () => {
    setSelectedFile(null);
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
      onClose(); // Close modal after upload
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  return (
    <div className={`pf-logout-modal-wrapper ${isOpen ? "show" : ""}`}>
      <div className="pf-review-logout-modal-content">
        <div className="pf-review-login-main-container">
          <div className="pf-review-container">
            <div className="npmc-close-btn-con" onClick={onClose}>
              <button className="npmc-close-btn">
                <Image src={crossicon} height={9} width={9} alt="x"></Image>
              </button>
            </div>
            <div className="pf-review-box text-center">
              <div className="phis-thumbnil">
                <Image
                  src={`${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${order.productImageUrl}`}
                  alt="Product"
                  className="img-fluid phis-product-image"
                  width={153}
                  height={136}
                  // layout="responsive"
                />
              </div>
              <Image src={img2} alt={"title"} width={100} height={100} />
              <div className="product-details">
                <p className="success-heading">We Love Feedback!</p>

                <p className="success-title">
                  We’ve received your wish product request. It will be delivered
                  to your address within <strong>2-14 working days</strong>.
                  Once you receive your product, please share your review with
                  us.
                </p>

                <div className="upload-btn mt-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                    id="file-upload"
                  />
                  {!selectedFile ? (
                    <label
                      htmlFor="file-upload"
                      className="pta-upload-link text-center"
                    >
                      <Image
                        src={uploadIcon}
                        height={22}
                        width={20}
                        alt="uploadIcon"
                      ></Image>{" "}
                      Upload Product Image
                    </label>
                  ) : (
                    <div className="selected-file-container text-center">
                      <a href="#" className="pta-upload-link text-center">
                        Image attached
                        <Image
                          onClick={removeFile}
                          src={attachRemoveicon}
                          width={20}
                          height={20}
                          alt="attach"
                          className="pta-attach"
                        ></Image>
                      </a>
                    </div>
                  )}
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
      </div>
    </div>
  );
};

export default LoginModal;
