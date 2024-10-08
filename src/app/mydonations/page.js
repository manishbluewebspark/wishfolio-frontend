import React from 'react';
import Statistics from '../Components/mystatistics/Statistics';
import WishCard from '../Components/WishCard/WishCard'; // Ensure you have this component in place
import watchImage from "../images/watchimg.png";
import bagImage from "../images/bagimg.png";
import profileImage from "../images/Male15.png";

const Page = () => {
  const productData = [
    { 
      id: 1, 
      productImage: watchImage, 
      title: "Apple Watch Series 6", 
      price: 34000, 
      donationGoal: 54990, 
      category: "electronics", 
      donors: [
        { name: "Theresa Webb", profileImage: profileImage, donationAmount: 500 }
      ] 
    },
    { 
      id: 2, 
      productImage: bagImage, 
      title: "Versace Handbag", 
      price: 24000, 
      donationGoal: 40000, 
      category: "fashion", 
      donors: [
        { name: "Sinan CP", profileImage: profileImage, donationAmount: 500 }
      ] 
    },
    // Add more products as needed
  ];
  
  return (
    <>
      <Statistics />
      <div className="row product-con my-2">
        {productData.map(product => (
          <div className="col-md-6 col-sm-6 col-6 product-col" key={product.id}>
            <WishCard
              productImage={product.productImage}
              title={product.title}
              price={product.price}
              donationGoal={product.donationGoal}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Page;
