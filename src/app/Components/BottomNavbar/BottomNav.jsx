"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import "./style.css";
import starIcon from "../../images/star.jpg"; // Replace with your icon path
import dropIcon from "../../images/drop.jpg"; // Replace with your icon path
import vectorIcon from "../../images/moon.png"; // Replace with your icon path
import profileIcon from "../../images/Male15.png"; // Replace with your icon path
import { useRouter, usePathname } from "next/navigation"; // Import the necessary hooks

const BottomNav = () => {
  const [selected, setSelected] = useState("Wishes");
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  const options = [
    { name: "Wishes", icon: starIcon, isImage: true, url: "/" },
    {
      name: "My Donations",
      icon: dropIcon,
      isImage: true,
      url: "/mydonations",
    },
    { name: "My Wish", icon: vectorIcon, isImage: true, url: "/mywish" },
    { name: "Profile", icon: profileIcon, isImage: true, url: "/profile" },
  ];

  const handleSelect = (option) => {
    setSelected(option.name);
    router.push(option.url); // Use router.push to navigate
  };

  // Use useEffect to update the selected state based on the current route
  useEffect(() => {
    const currentOption = options.find((option) => option.url === pathname);
    if (currentOption) {
      setSelected(currentOption.name);
    }
  }, [pathname]); // Run whenever the route changes

  return (
    <div className="bottom-nav fixed-bottom bg-light">
      <div className="">
        <div className="row text-center">
          {options.map((option) => (
            <div
              key={option.name}
              className={`col ${selected === option.name ? "active-item" : ""}`}
              onClick={() => handleSelect(option)}
            >
              <div className="icon-container-bn">
                <Image
                  src={option.icon}
                  alt={option.name}
                  width={24}
                  height={24}
                  className="rounded-circle"
                />
              </div>
              <div
                className={`nav-text-bn ${
                  selected === option.name ? "active-text" : ""
                }`}
              >
                {option.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
