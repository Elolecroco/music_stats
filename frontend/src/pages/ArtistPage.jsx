import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios  from "../server";
import PrevPageBtn from '../components/Arrows/PrevPageBtn';
import './ArtistPage.css';

const ArtistPage = () => {
    const {id} = useParams();
    const [artist, setArtist] = useState([])
    const [albums, setAlbums] = useState([])
    const [topTracks, setTopTracks] = useState([])
    const [artistCount, setArtistCount] = useState(0);
    const [results, setResults] = useState([]);
    const [artistTracks, setArtistTracks] = useState([]);
        
        useEffect(() => {

            axios
                .get(`https://api.spotify.com/v1/artists/${id}`, {
                    headers: {
                        'Authorization': process.env.REACT_APP_ACCESS_TOKEN,
                    }
                })
                .then(res => {setArtist(res.data)})
                .catch(err => {
                    console.error(err);
                    setArtist([])
                })

            axios
                .get(`https://api.spotify.com/v1/artists/${id}/albums`, {
                    headers: {
                        'Authorization': process.env.REACT_APP_ACCESS_TOKEN,
                    }
                })
                .then(res => {
                    setAlbums(res.data.items);
                })
                .catch(err => {
                    console.error(err);
                    setAlbums([])
                })

            axios
                .get(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=FR`, {
                    headers: {
                        'Authorization': process.env.REACT_APP_ACCESS_TOKEN,
                    }
                })
                .then(res => {
                    setTopTracks(res.data.tracks);
                })
                .catch(err => {
                    console.error(err);
                    setTopTracks([])
                })

            axios
                .get('/api/playlists')
                .then(res => {
                    setResults(res.data[0])
                })
                .catch(err => {
                    console.error(err);
                    setResults([])
                })
                
        }, [id])

        useEffect(() => {
            if (results.length > 0 && artist?.name) {
                const count = results.filter(item => item.artist === artist.name).length;
                setArtistCount(count);
            }

            if (results.length > 0 && artist?.name) {
                const allArtistTracks = results.filter(item => item.artist === artist.name);

                const songCount = new Map();
                allArtistTracks.forEach(track => {
                    const songName = track.track;
                    songCount.set(songName, (songCount.get(songName) || 0) + 1)
                })

                const artistTracksWithCount = Array.from(songCount, ([songName, count]) => ({ songName, count}));

                const sortedTracksWithCount = artistTracksWithCount.sort((a, b) => b.count - a.count);
                setArtistTracks(sortedTracksWithCount);
                console.log(artistTracksWithCount);
            }
        }, [results, artist]);

        const reversedDate = (date) => {
            const [year, month, day] = date.split('-');
            return`${day}-${month}-${year}`;
        }

        const convertedDuration = (duration) => {
            const min = Math.floor(duration / 60000);
            const sec = Math.floor((duration % 60000) / 1000)
            return `${min}:${sec < 10 ? '0' : ''}${sec}`
        }

        const sortAlbumByReleaseDate = (a, b) => new Date(b.release_date) - new Date(a.release_date);
        const sortedAlbums = albums.sort(sortAlbumByReleaseDate);

    return (
        <div className='artist-page'>
            <PrevPageBtn />
            <div className='artist-page-header'>
                <div className='artist-photo'>
                    <div className='artist-img-container'>
                        {artist.images && <img src={artist.images[0].url} alt={artist.name} />}
                    </div>
                </div>
                <div className='artist-desc'>
                    <h1>{artist.name}</h1>
                    <h2>Appears {artistCount} times in your playlists</h2>
                </div>
            </div>
            
            <div className='artist-content'>
                <div className='artist-songs-listened'>
                    <h2>Your liked songs</h2>
                    <ul className='songs-listened-list'>
                        {artistTracks.map((track, index) => (
                            <li key={index}>
                                <Link to={`../song`}>
                                    <p>{track.songName}</p>
                                </Link>
                                <p>{track.count}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='artist-top-songs'>
                    <h2>Top tracks</h2>
                    <ul className='top-songs-list'>
                        {topTracks.slice(0, 5).map(topTrack => (
                            <li key={topTrack.id}>
                                <Link to={`../albums/${topTrack.album.id}`}>
                                    <p>{topTrack.name}</p>
                                    <p>{convertedDuration(topTrack.duration_ms)}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <ul className='artist-albums'>
                    {sortedAlbums.map(album => (
                    <li key={album.id}><Link to={`/albums/${album.id}`}>
                        <div className='song-photo'>
                            <div className='song-img-container'>
                                <img src={album.images[0].url} alt={album.name} />
                            </div>
                        </div>
                        <div className='album-desc'>
                            <p>{album.name}</p>
                            {album.release_date && <span>{reversedDate(album.release_date)}</span>}
                        </div>
                    </Link></li>
                ))}
                </ul>
            </div>
           
        </div>
    ) 
}

export default ArtistPage;