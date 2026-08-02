import Navbar from '../Navbar/Navbar';
import { usePageContext } from "../../Context/PageContext";

const Header = () => {
    const { pagesData } = usePageContext();
    const navbarData = pagesData?.home?.navbar || {};

    return (
        <div>
            <Navbar data={navbarData} />
        </div>
    );
};

export default Header;

