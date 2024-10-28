"use client";
import Image from "next/image";
import logoIcon from "../../images/Snow.svg"; // Use your logo image here
import StarIcon from "../../images/star.svg"; // Use the settings icon image
import { useRouter } from "next/navigation";
// import './style.css';

const TopBar = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/storiespage"); // Navigate to the /store route
  };
  const goToHome = () => {
    router.push("/"); // Navigate to the /store route
  };

  return (
    <nav className="navbar top-nav ">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center top-bar">
          {/* <a className="navbar-brand" href="#">
            <Image src={logoIcon} alt="Logo" width={32} height={32} />
          </a> */}
          <a className="navbar-brand d-flex align-items-center" onClick={goToHome} style={{cursor:'pointer'}} >
            <Image src={logoIcon} alt="WishFolio Logo" width={32} height={32} />
            <span className="brand-text">
              Wish<span className="highlight-text">Folio</span>
            </span>
          </a>
          <div onClick={handleClick} style={{ cursor: "pointer" }} className="navbar-star-icon-con">
            <Image src={StarIcon} alt="Settings" width={20} height={20} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
