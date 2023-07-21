import { Link } from "react-router-dom";
import NavBar from "../components/Navbar/NavBar";
import BySeasonBtn from "../components/StatsBtn/BySeasonBtn";
import BySongBtn from "../components/StatsBtn/BySongBtn";
import { BsSendFill } from 'react-icons/bs'
import "./Stats.css";

const Stats = () => {
    return (
        <div className="stats-page">
            <h1>Stats</h1>
            <div className="stats-categories-link">
                <Link to="/stats/artists"><h2>Artists stats</h2></Link>
                <h2>Songs stats</h2>
                <Link to="/stats/year"><h2>Years stats</h2></Link>
                <Link to="/stats/season"><h2>Seasons stats</h2></Link>
                <Link to='/stats/language'><h2>Languages stats</h2></Link>
            </div>
            <NavBar />
        </div>
    )
}

export default Stats