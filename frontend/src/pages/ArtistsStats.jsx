import NavBar from "../components/Navbar/NavBar";
import ByArtistBtn from "../components/StatsBtn/ByArtistBtn";
import ArtistSearch from "../components/Search/ArtistSearch";
import "./ArtistsStats.css";

const ArtistsStats = () => {
    return (
        <div className="artists-stats-page">
            <h1>Stats by Artist</h1>
            <ArtistSearch />
            <NavBar />
        </div>
    )
}

export default ArtistsStats;