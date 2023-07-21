import NavBar from "../components/Navbar/NavBar";
import ByYearBtn from "../components/StatsBtn/ByYearBtn";
import "./YearStats.css";

const YearStats = () => {
    return (
        <div className="year-stats-page">
            <h1>Stats by Year</h1>
            <ByYearBtn />
            <NavBar />
        </div>
    )
}

export default YearStats;