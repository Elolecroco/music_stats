import TopArtists from "../components/HomePage/TopArtists";
import TopSongs from "../components/HomePage/TopSongs";
import "./Home.css"

const Home = () => {

    return (
        <div className="home-page">
            <div className="home-page-header">
                <h1>Home</h1>
                <h2>Welcome to MeloStats!</h2>
                <p>All your playlists stats in one place!</p>
            </div>
            
            <div className="top-artists-section">
               <h2>Top Artists</h2>
                <TopArtists />
            </div>
            <div className="top-songs-section">
               <h2>Top Songs</h2>
                <TopSongs /> 
            </div>
        </div>
    )
}

export default Home