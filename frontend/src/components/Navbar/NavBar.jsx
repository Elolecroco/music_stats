import { NavLink, useLocation } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { MdSearch, MdLibraryMusic } from "react-icons/md";
import { IoMdStats }from "react-icons/io";
import './NavBar.css'

function NavBar() {
    const { pathname } = useLocation();
    
    return (
        <div className="navbar-container">
            <p>MeloStats</p>
            <NavLink to="/" className={pathname === "/" ? "active" : ""}><HiHome className="icon" /></NavLink>
            <NavLink to="/search" className={pathname === "/search" ? "active" : ""}><MdSearch className="icon" /></NavLink>
            <NavLink to="/library" className={pathname === "/library" ? "active" : ""}><MdLibraryMusic className="icon" /></NavLink>
            <NavLink to="/stats" className={pathname === "/stats" ? "active" : ""}><IoMdStats className="icon" /></NavLink>
        </div>
    )
}

export default NavBar;