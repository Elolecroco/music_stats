import axios from '../../server';
import { useEffect, useState } from 'react';
import './StatsBtn.css';

const BySeasonBtn = () => {
    const [seasonsData, setSeasonsData] = useState([]);
    const [musicData, setMusicData] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        axios.get(`/api/playlists`)
            .then(res => {
                const uniqueSeasons = [...new Set(res.data[0].map(item => item.Season))];
                setSeasonsData(uniqueSeasons);
                setMusicData(res.data[0]);

                if(musicData.length === 0) {
                    return;
                }

                const songPromises = musicData.map((music) => 
                    axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(music.artist + ' ' + music.track)}&type=track`, {
                        headers: {
                            'Authorization': process.env.REACT_APP_ACCESS_TOKEN,
                        }
                    })
                );
                Promise.all(songPromises)
                    .then(responses => {
                        const songWithImages = responses.map((res, index) => {
                            const musicData = res.data.tracks.items[0];
                            return {
                                ...uniqueSeasons[index],
                                image: musicData.album.images[0]?.url || null,
                            }
                        })
                        setMusicData(songWithImages);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            })
            .catch(err => {
                console.error(err);
            });
    }, [musicData]);

    const handleSeasonBtn = (season) => {
        const filteredBySeason = musicData.filter(item => item.Season === season);
        setSelectedSeason(season);

        const soungCounts = filteredBySeason.reduce((counts, song) => {
            const key = `${song.artist} - ${song.track}`;
            counts[key] = (counts[key] || 0) + 1;
            return counts
        }, {});

        const uniqueSongs = Array.from(new Set(filteredBySeason.map(song => `${song.artist} - ${song.track}`)))
        const filteredWithCounts = uniqueSongs.map(songKey => {
            const [artistName, songName] = songKey.split(' - ');
            return {
                artist: artistName,
                track: songName,
                Count: soungCounts[songKey]
            }
        })

        const sortByCount = filteredWithCounts.sort((a, b) => b.Count - a.Count);
        setFilteredData(sortByCount);
    };

    // TO FIND HOW MANY SONGS WERE LISTENED TO IN A Season
    const totalSongs = filteredData.length;

    // TO FIND WHAT ARTIST WAS THE MOST LISTENED TO IN A Season
    const mostListenedArtist = filteredData.reduce((maxArtist, currentArtist) => {
        if (!maxArtist || currentArtist.Count > maxArtist.Count) {
            return currentArtist;
        }
        return maxArtist
    }, null)

    return (
        <div className='seasons-container'>
            <div className='seasons-btn-container'>
                {seasonsData && seasonsData.map((season) => (
                    <button key={season} onClick={() => handleSeasonBtn(season)}>{season}</button>
                ))}
            </div>
           
            <div className='seasons-btn-results'>
                <h3>Total songs: {totalSongs} </h3>
                <h3>Most Generally Listened Artist During This Season: {mostListenedArtist && mostListenedArtist.artist} </h3>
                {selectedSeason && filteredData && musicData.length > 0 && (
                    <ul className="songs-list">
                    {filteredData.map(song => (
                        <li key={song.id}>
                            <div className="album-cover-container">
                                {song.image && <img src={song.image} alt={`${song.track} album cover`} />} 
                            </div>
                            {song.artist} - {song.track} &nbsp; <span className='song-count'>{song.Count === 1 ? 'Appears 1 time' : `Appears ${song.Count} times`}</span>
                        </li>
                    ))}
                </ul>
                )}
                
            </div>
        </div>
    );
}

export default BySeasonBtn;