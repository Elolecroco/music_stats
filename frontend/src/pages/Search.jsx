import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import NavBar from "../components/Navbar/NavBar"
import FavoriteBtn from "../components/Favorite/FavoriteBtn";
import { BsSendFill } from 'react-icons/bs'
import './Search.css'

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    const searchUrl = `https://api.spotify.com/v1/search?q=${searchTerm}&type=artist,track,album`;
    axios
      .get(searchUrl, {
        headers: {
          Authorization: process.env.REACT_APP_ACCESS_TOKEN,
        },
      })
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const objKeys = Object.keys(searchResults)

  return (
    <div className="search-page">
      <div className="search-page-header">
        <h1>Search</h1>
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a song..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <BsSendFill type="submit" className="search-btn"/>
        </form>
      </div>
     
      
      {objKeys.map((objKey) => (
        <div key={objKey.id} className={`${objKey}-container`}>
          <h2>{objKey}</h2>
          <div className={`${objKey}-cards-container`}>
            {searchResults[objKey].items.map(elem => elem.type !== 'track' ?
              <Link to={`../../${objKey}/${elem.id}`}>
                <div className={`${objKey}-card`} key={elem.id}>
                  <div className={`${objKey}-img-container-box`}>
                    <div className={`${objKey}-img-container`}>
                      {!!(elem.images && elem.images.length) &&
                      <img src={elem.images[0].url} alt={elem.name}/>}
                    </div>
                  </div>
                  <div className={`${objKey}-name-container`}>
                    <h3>{elem.name}</h3>
                    <FavoriteBtn />
                  </div>
                </div>
              </Link> : 
              <div className={`${objKey}-card`} key={elem.id}>
                <div className={`${objKey}-img-container-box`}>
                  <div className={`${objKey}-img-container`}>
                    {!!(elem.album.images && elem.album.images.length) &&
                    <img src={elem.album.images[0].url} alt={elem.album.name}/>}
                  </div>
                </div>
                <div className={`${objKey}-name-container`}>
                  <h3>{elem.artists[0].name} - {elem.name}</h3>
                  <FavoriteBtn />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      <NavBar />
    </div>
  );
}

export default Search;
