import { useState } from 'react';
import axios from '../../server';
import { BsSendFill } from 'react-icons/bs'
import './SearchBar.css';

const StatsSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (event) => {
        event.preventDefault();
        axios
            .get(`/api/playlists/`)
            .then((response) => {
            setSearchResults(response.data[0]);
            })
            .catch((err) => {
            console.log(err);
            });
    };
    return (
        <div className='search-bar-container'>
            <h2>Search for stats</h2>
            <form className="search-bar" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for a song or an artist..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <BsSendFill type="submit" className="search-btn"/>
            </form>
        </div>
    )
}

export default StatsSearch;