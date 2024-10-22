// layout.js

import BottomNav from "../Components/BottomNavbar/BottomNav";
import TopBar from "../Components/Topbar/Topbar";


export default function Layout({ children }) {
  return (
    <>
      <div className="main-layout">
        <div className="bg-light page-container">
          <div className="content-container2 container">
            {children}
          </div>
          <BottomNav />
        </div>
      </div>
    </>
  );
}
