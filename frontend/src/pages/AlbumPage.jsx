import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios  from "../server";
import PrevPageBtn from '../components/Arrows/PrevPageBtn';
import './AlbumPage.css';

const AlbumPage = () => {
    const {id} = useParams();
    const [album, setAlbum] = useState([])
    const [tracks, setTracks] = useState([])
        
        useEffect(() => {
            axios
                .get(`https://api.spotify.com/v1/albums/${id}`, {
                    headers: {
                        'Authorization': process.env.REACT_APP_ACCESS_TOKEN,
                    }
                })
                .then(res => {setAlbum(res.data)})
                .catch(err => {
                    console.error(err);
                    setAlbum(null)
                })

            axios
                .get(`https://api.spotify.com/v1/albums/${id}/tracks`, {
                  headers: {
                    'Authorization': process.env.REACT_APP_ACCESS_TOKEN,
                  }
                })
                .then(res => {
                  setTracks(res.data.items);
                })
                .catch(err => {
                  console.error(err);
                  setTracks([]);
                });
        }, [id]);
        
        const reversedDate = (date) => {
            const [year, month, day] = date.split('-');
            return`${day}-${month}-${year}`;
        }

        const convertedDuration = (duration) => {
            const min = Math.floor(duration / 60000);
            const sec = Math.floor((duration % 60000) / 1000)
            return `${min}:${sec < 10 ? '0' : ''}${sec}`
        }

    return (
        <div className='album-page'>
            <PrevPageBtn />
            <div className='album-page-header'>
                <div className='song-photo'>
                    <div className='song-img-container'>
                        {album.images && <img src={album.images[0].url} alt={album.name}/>}
                    </div>
                </div>
                <div className='album-desc'>
                    <h1>{album.name}</h1>

                    {album.artists && (
                        <h2>
                            {album.artists.map((artist) => (
                                <Link key={artist.id} to={`../artists/${artist.id}`}>
                                    {artist.name}
                                </Link>
                            )).length > 1
                                ? album.artists.map((artist) => (
                                    <Link key={artist.id} to={`../artists/${artist.id}`}>
                                        {artist.name}
                                    </Link>
                                )).reduce((prev, curr) => [prev, ', ', curr])
                                : (
                                    <Link to={`../artists/${album.artists[0].id}`}>
                                        {album.artists[0].name}
                                    </Link>
                            )}
                        </h2>
                    )}
                    
                    {album.release_date && <p>Release date: {reversedDate(album.release_date)}</p>}
                    <p>Album total {album.total_tracks === 1 ? 'track' : 'tracks'}: {album.total_tracks}</p>
                    <p>Popularity: {album.popularity}</p>
                </div>
            </div>
            <ul className='album-tracks'>
                {tracks.map(track => (
                    <li key={track.id}>
                        <p>{track.name}</p>
                        <p>{convertedDuration(track.duration_ms)}</p>
                        <p>{track.track_number}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AlbumPage;