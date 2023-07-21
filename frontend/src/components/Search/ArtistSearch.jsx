import { useState } from 'react';
import axios from '../../server';
import { BsSendFill } from 'react-icons/bs'
import './SearchBar.css';

const ArtistSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (event) => {
        event.preventDefault();
        axios
            .get(`/api/playlists/artists/${encodeURIComponent(searchTerm)}`)
            .then((response) => {
            setSearchResults(response.data);
            })
            .catch((err) => {
            console.log(err);
            });
    };
    return (
        <div className='search-bar-container'>
            <h2>Search for an artist</h2>
            <form className="search-bar" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for an artist..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <BsSendFill type="submit" className="search-btn"/>
            </form>
            <div className="search-results">
                {searchResults.map((result) => (
                <div key={result.id}>
                    <h3>{result.artist}</h3>
                    <p>{result.track}</p>
                </div>
                ))}
            </div>
        </div>
    )
}

export default ArtistSearch;