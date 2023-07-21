import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import axios  from "../../server";
import './TopMusic.css';

const TopArtists = () => {
    const [artists, setArtists] = useState([]);
    const [artistCount, setArtistCount] = useState({});
  
    useEffect(() => {
      axios
        .get("/api/playlists")
        .then((response) => {
          const count = {};
          response.data[0].forEach((artist) => {
            if (count[artist.artist]) {
              count[artist.artist]++;
            } else {
              count[artist.artist] = 1;
            }
          });
          setArtistCount(count);
  
          const uniqueArtists = [];
          response.data[0].forEach((artist) => {
            if (
              count[artist.artist] >= 5 &&
              !uniqueArtists.find((el) => el.artist === artist.artist)
            ) {
              uniqueArtists.push(artist);
            }
          });
          uniqueArtists.sort(
            (a, b) => artistCount[b.artist] - artistCount[a.artist]
          );
  
          // Récupération des images des artistes
          const artistPromises = uniqueArtists.map((artist) =>
            axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artist.artist)}&type=artist`, {
              headers: {
                'Authorization': process.env.REACT_APP_ACCESS_TOKEN,
              },
            })
          );
  
          Promise.all(artistPromises)
            .then((responses) => {
              const artistsWithImages = responses.map((response, index) => {
                const artistData = response.data.artists.items[0];
                return {
                  ...uniqueArtists[index],
                  image: artistData.images[0]?.url || null,
                  id: artistData.id || null,
                };
              });
              setArtists(artistsWithImages);
            })
            .catch((err) => {
              // Gérer les erreurs
              console.error(err);
            });
        })
    }, [artistCount]);
  
    return (
      <div className="top-artists-page">
        <ul className="artist-items">
          {artists &&
            artists.map((artist, index) => (
              <Link key={index} to={`/artists/${artist.id}`}><li className="artist-card">
                {artist.artist}
                <div className="artist-photo">
                  <div className="artist-img-container">
                      {artist.image && <img src={artist.image} alt={artist.artist} />}
                  </div>
                </div> 
                
                <p>Appears: {artistCount[artist.artist]} times</p>
              </li></Link>
            ))}
        </ul>
      </div>
    );
  };
  
  export default TopArtists;
