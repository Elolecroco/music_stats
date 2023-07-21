import { useState } from "react"
import NavBar from "../components/Navbar/NavBar"
import PlaylistsList from "../components/Playlist/PlaylistsList"
import PlaylistsSpotify from "../components/Playlist/PlaylistsSpotify"
import AddPlaylist from "../components/Playlist/AddPlaylist"
import "./Library.css"

const Library = () => {

    const [activeFilter, setActiveFilter] = useState(null);
    const [sortOrder, setSortOrder] = useState(true);

    const handleFilter = filter => {
        if (filter === activeFilter) {
            setSortOrder(!sortOrder);
        } else {
            setSortOrder(true)
        }
        setActiveFilter(filter)
    }


    return (
        <div className="library-page">
            <h1>Library</h1>
            <div className="library-page-btn-container">
                <button onClick={() => handleFilter('year')}>By Year</button>
                <button onClick={() => handleFilter('season')}>By Season</button>
            </div>
            <AddPlaylist />
            <div className="library-page-playlists-container">
                <PlaylistsList filter={activeFilter} sortOrder={sortOrder}/>
            </div>
            <NavBar />
        </div>
    )
}

export default Library