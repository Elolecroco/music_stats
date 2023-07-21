import NavBar from "../components/Navbar/NavBar";
import BySeasonBtn from "../components/StatsBtn/BySeasonBtn";
import "./SeasonsStats.css";

const YearStats = () => {
    return (
        <div className="season-stats-page">
            <h1>Stats by Season</h1>
            <BySeasonBtn />
            <NavBar />
        </div>
    )
}

export default YearStats;