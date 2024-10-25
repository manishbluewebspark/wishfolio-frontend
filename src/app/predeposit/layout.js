// layout.js

import BottomNav from "../Components/BottomNavbar/BottomNav";
import TopBar from "../Components/Topbar/Topbar";


export default function Layout({ children }) {
  return (
    <>
      <div className="main-layout">
        <div className="bg-white page-container">
          {/* <TopBar /> */}
          <div className="content-container">
            {children}
          </div>
          {/* <BottomNav /> */}
        </div>
      </div>
    </>
  );
}
