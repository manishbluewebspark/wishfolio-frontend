// layout.js

import BottomNav from "../Components/BottomNavbar/BottomNav";
import TopBar from "../Components/Topbar/Topbar";

export default function Layout({ children }) {
  return (
    <>
      <div className="main-layout">
        <div className="bg-white page-container">
          {/* <TopBar /> */}
          <div
            style={{
              overflowY: "scroll",
              backgroundColor: "white",
              width: "100%",
              height: "100%",
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
