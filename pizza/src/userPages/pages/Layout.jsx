import UserHeadBar from "../components/userHeadBar"
import LandingPage from "./LandingPage"
import AboutUsPage from "./AboutUsPage"
import RestaurantsPage from "./RestaurantsPage"
import PicturesPage from "./PicturesPage"
import UserFooter from "../components/userFooter"

const Layout = () => {
    return (
        <div className="Layout">
            <UserHeadBar /> 
            <LandingPage /> 
            <AboutUsPage />
            <PicturesPage />
            <RestaurantsPage />
            <UserFooter />
        </div>
    )
}

export default Layout