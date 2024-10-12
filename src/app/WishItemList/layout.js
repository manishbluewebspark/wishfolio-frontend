// layout.js

import BottomNav from "../Components/BottomNavbar/BottomNav";
import TopBar from "../Components/Topbar/Topbar";

export default function Layout({ children }) {
  return (
    <>
      <div className="main-layout">
        <div className="bg-light page-container">
          {/* <TopBar /> */}
          <div
            style={{
              overflowY: "scroll",
              backgroundColor: "white",
              width: "100%",
              height: "100vh",
            }}
          >
            {children}
          </div>
          {/* <BottomNav /> */}
        </div>
      </div>
    </>
  );
}
