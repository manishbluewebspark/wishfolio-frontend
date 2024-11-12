import BottomNav from "./Components/BottomNavbar/BottomNav";
import EmojisCard from "./Components/Topbar/EmojisCard";
import TopBar from "./Components/Topbar/Topbar";
import ProductCard from "./Components/WishCard/ProductCard";
import HowItWorkingBtn from "./Components/Button/HowItWorkingBtn";

export default function HomePage() {
  return (
    
    <>
     <div className="main-layout">
        <div className="page-container">
          <TopBar />
          <div className="content-container">
          <EmojisCard />
          <ProductCard />
          </div>
          <div className="hitwork-btn-sticky">
          <HowItWorkingBtn></HowItWorkingBtn>
          </div>
          <BottomNav />
        </div>
      </div>
   
    </>
  );
}
