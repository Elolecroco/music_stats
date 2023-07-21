import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdArrowDropleft,IoMdArrowDropright } from "react-icons/io"
import axios from "../server";
import PrevPageBtn from "../components/Arrows/PrevPageBtn";
import NavBar from "../components/Navbar/NavBar";
import "./Playlist.css"

const Playlist = () => {
    const { playlistName } = useParams();
    const navigate = useNavigate();
    const previousPage = () => {
      navigate(-1);
    }

    const [playlistData, setPlaylistData] = useState([]);
    const [sortArtistsOrder, setSortArtistsOrder] = useState('asc');
    const [sortSongsOrder, setSortSongsOrder] = useState('asc');
    const [songData, setSongData] = useState([]);
    const [seasons, setSeasons] = useState([]);

    useEffect(() => {
      axios.get(`/api/playlists`)
        .then(response => {
          const playlist = response.data[0].filter(
            playlist =>
              playlist.playlist_name.toLowerCase() === playlistName
          );
          if (playlist.length > 0) {
            setPlaylistData(playlist);

            const songPromises = playlist.map(song => 
              axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(song.artist + ' ' + song.track)}&type=track`, {
                headers: {
                  'Authorization': process.env.REACT_APP_ACCESS_TOKEN,
                }
              })
            );
            Promise.all(songPromises)
              .then(responses => {
                const songWithImages = responses.map((res, index) => {
                  const songData = res.data.tracks.items[0];
                  return {
                    ...playlist[index],
                    image: songData.album.images[0]?.url || null,
                    albumId: songData.album.id || null,
                    artistId: songData.artists[0].id || null,
                    songId: songData.id
                  };
                });
                setSongData(songWithImages);
              })
              .catch(err => {
                console.error(err);
              })
          }
        })
        .catch(err => {
          console.error(err);
        })

        axios.get('/api/seasons')
          .then(res => {
            setSeasons(res.data[0])
            console.log(seasons);
          })
          .catch(err => {
            console.error(err);
          })
    }, []);

    const currentSeasonIndex = seasons.findIndex(season => season.name.toLowerCase() === playlistName);
    console.log(currentSeasonIndex);


    const nextPlaylist = () => {
      currentSeasonIndex++
    }

    const prevPlaylist = () => {
      currentSeasonIndex--
    }

    

    if(!playlistData) {
      return <p>Nothing to see!</p>
    }
    
    const handleArtistsSorting = () => {
      const sortedArtists = [...songData].sort((a, b) => {
        return a.artist.localeCompare(b.artist, undefined, {sensitivity: 'base'}) * (sortArtistsOrder === 'asc' ? 1 : -1);
      });
      setSortArtistsOrder(sortArtistsOrder === 'asc' ? 'desc' : 'asc');
      setSongData(sortedArtists);
    };
    
    const handleSongsSorting = () => {
      const sortedSongs = [...songData].sort((a, b) => {
        return a.track.localeCompare(b.track, undefined, { sensitivity: 'base'}) * (sortSongsOrder === 'asc' ? 1 : -1);
      });
      setSortSongsOrder(sortSongsOrder === 'asc' ? 'desc' : 'asc');
      setSongData(sortedSongs);
    };

    return (
      <div className="playlist-page">
        <PrevPageBtn />
        <div className="playlist-header">
          <IoMdArrowDropleft className="arrow prev" />
          <h1>{playlistName.toUpperCase()}</h1>
          <IoMdArrowDropright className="arrow next" />
        </div>
        <div className="filter-btn-container">
          <button onClick={handleArtistsSorting}>
            {sortArtistsOrder === 'asc' ? "Artists: Z-A" : "Artists: A-Z"}
            {sortArtistsOrder === 'asc' ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
          </button>
          <button onClick={handleSongsSorting}>
            {sortSongsOrder === 'asc' ? "Songs: Z-A" : "Songs: A-Z"}
            {sortSongsOrder === 'asc' ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
          </button>
        </div>
        <ul className="songs-list">
          {songData && songData.map(song => (
            <li key={song.id}>
              <Link to={`/albums/${song.albumId}`}><div className="album-cover-container-box">
                <div className="album-cover-container">
                  {song.image && <img src={song.image} alt={`${song.track} album cover`} />} 
                </div>
              </div></Link>
              
              <Link to={`../../artists/${song.artistId}`}><h3>{song.artist}&nbsp;</h3></Link> - <Link to={`../../albums/${song.albumId}`}>&nbsp;{song.track} &nbsp;</Link> {song.language !== null ? <span className="song-language">{song.language}</span> : <></>}
            </li>
          ))}
        </ul>
        <NavBar />
      </div>
    );
  };
  
  export default Playlist;