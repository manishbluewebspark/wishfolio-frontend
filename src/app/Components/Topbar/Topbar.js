import Image from 'next/image';
import logoIcon from '../../images/snow.png'; // Use your logo image here
import settingsIcon from '../../images/settingsIcon.png'; // Use the settings icon image
import './style.css';

const TopBar = () => {
  return (
    <nav className="navbar top-nav navbar-light bg-white fixed-top">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center top-bar">
          {/* <a className="navbar-brand" href="#">
            <Image src={logoIcon} alt="Logo" width={32} height={32} />
          </a> */}
          <a className="navbar-brand d-flex align-items-center" href="#">
            <Image src={logoIcon} alt="WishFolio Logo" width={40} height={40} />
            <span className="brand-text">Wish<span className="highlight-text">Folio</span></span>
          </a>
          <div>
            <Image src={settingsIcon} alt="Settings" width={40} height={40} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
