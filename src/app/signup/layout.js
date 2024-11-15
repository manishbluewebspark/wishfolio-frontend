// layout.js

import BottomNav from "../Components/BottomNavbar/BottomNav";
import TopBar from "../Components/Topbar/Topbar";


export default function Layout({ children }) {
  return (
    <>
      <div className="main-layout">
        <div className="bg-white page-container">
          <div className="content-container">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
