import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios  from "../../server";
import './TopMusic.css';

const TopSongs = () => {
    const [songs, setSongs] = useState([]);
    const [songCount, setSongCount] = useState({});

    useEffect(() => {
        axios.get('/api/playlists')
            .then(response => {
                const count = {};
                response.data[0].forEach(song => {
                    if (count[song.track]) {
                        count[song.track]++;
                    } else {
                        count[song.track] = 1;
                    }
                });
                setSongCount(count);

                const uniqueSong = [];
                response.data[0].forEach(song => {
                    if (count[song.track] >= 3 && !uniqueSong.find(el => el.track === song.track)) {
                        uniqueSong.push(song)
                    }
                });
                uniqueSong.sort((a, b) => {
                    return songCount[b.track] - songCount[a.track];
                  });
                
            // Récupération des images des chansons
            const songPromises = uniqueSong.map((song) =>
                axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(song.artist + ' ' + song.track)}&type=track`, {
                headers: {
                    'Authorization': process.env.REACT_APP_ACCESS_TOKEN,
                },
                })
            );
    
            Promise.all(songPromises)
                .then((responses) => {
                const songsWithImages = responses.map((response, index) => {
                    const songData = response.data.tracks.items[0];
                    return {
                    ...uniqueSong[index],
                    image: songData.album.images[0].url || null,
                    id: songData.id || null,
                    album_id: songData.album.id || null,
                    artist_id: songData.artists[0].id || null,
                    };
                });
                setSongs(songsWithImages);
                })
                .catch((err) => {
                console.error(err);
                });
            })
    }, [songCount]);
    
    return (
        <div className="top-songs-page">
            <ul className="song-items">
                {songs && songs.map((song, index) => (
                        <li key={index} className="song-card">
                            <Link to={`/artists/${song.artist_id}`}>{song.artist}</Link>
                            <div className="song-photo">
                                <Link to={`/albums/${song.album_id}`}><div className="song-img-container">
                                    {song.image && <img src={song.image} alt={song.track} />}
                                </div></Link>
                            </div>
                            <Link to={`/albums/${song.album_id}`}>{song.track}</Link>
                            <p>Appears: {songCount[song.track]} times</p>
                        </li>
                    
                    
                ))}
            </ul>
            
        </div>
    )
}

export default TopSongs;