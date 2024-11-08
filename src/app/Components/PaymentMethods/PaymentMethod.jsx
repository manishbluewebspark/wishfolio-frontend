"use client"; // Required for client-side rendering in Next.js
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { useRouter } from "next/navigation";
import Backbutton from "../Button/BackButton";
import arrowright from "../../images/arrow-right.svg";
const PaymentMethod = () => {
  const router = useRouter();
  const [paymentMethods, setPaymentMethods] = useState([]); // State to hold payment methods

  // Fetch payment methods from the API
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/payment-method`
        ); // Example API endpoint
        setPaymentMethods(response.data?.data); // Assuming the API returns an array of payment methods
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleDepositClick = (methodId) => {
    // You can pass the payment method ID if needed in the deposit route
    router.push(`/deposit/${methodId}`);
  };

  return (
    <div className="container">
      <Backbutton title={"Back"} />
      <div className="container ptm-container">
        <h5 className="ptm-title">Choose Payment Method</h5>
        <div className="ptm-payment-options">
          {paymentMethods.length > 0 ? (
            paymentMethods.map((method) => (
              <div
                key={method.id}
                className="ptm-payment-method d-flex justify-content-between align-items-center cursor-pointer"
                onClick={() => handleDepositClick(method._id)}
              >
                <div className="d-flex align-items-center">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${method.logo}`}
                    alt={method.provider}
                    className="ptm-icon"
                    width={119}
                    height={24}
                  />
                  <span>{method.provider}</span>
                </div>
                <Image
                  src={arrowright}
                  alt="Arrow Right"
                  className="ptm-arrow"
                  width={20}
                  height={20}
                />
              </div>
            ))
          ) : (
            <p>Loading payment methods...</p> // Fallback while fetching data
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
