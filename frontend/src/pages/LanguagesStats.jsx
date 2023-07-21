import NavBar from "../components/Navbar/NavBar";
import ByLanguageBtn from "../components/StatsBtn/ByLanguageBtn";
import "./LanguagesStats.css";

const LanguagesStats = () => {
    return (
        <div className="languages-stats-page">
            <h1>Stats by Language</h1>
            <ByLanguageBtn />
            <NavBar />
        </div>
    )
}

export default LanguagesStats;