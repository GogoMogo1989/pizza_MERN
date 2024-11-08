import React from 'react';
import UserNavbar from "../components/userNavbar";
import LandingPage from "./LandingPage";
import AboutUsPage from "./AboutUsPage";
import RestaurantsPage from "./RestaurantsPage";
import PicturesPage from "./PicturesPage";
import UserFooter from "../components/userFooter";

const Layout = () => {
  return (
    <div className="Layout">

      <UserNavbar /> 
    
      <div id="landing">
        <LandingPage />
      </div>

      <div id="about-us">
        <AboutUsPage />
      </div>

      <div id="pictures">
        <PicturesPage />
      </div>

      <div id="restaurants">
        <RestaurantsPage />
      </div>

      <UserFooter />
    </div>
  );
};

export default Layout;
