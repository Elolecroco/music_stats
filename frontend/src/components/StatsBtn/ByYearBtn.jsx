import axios from '../../server';
import { useEffect, useState } from 'react';
import './StatsBtn.css';

const ByYearBtn = () => {
    const [yearData, setYearData] = useState([]);
    const [musicData, setMusicData] = useState([]);
    const [musicImg, setMusicImg] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        axios.get(`/api/playlists`)
            .then(res => {
                const uniqueYears = [...new Set(res.data[0].map(item => item.Year))];
                setYearData(uniqueYears);
                setMusicData(res.data[0]);

                const songPromises = musicData.map((music) => 
                    axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(music.artist + ' ' + music.track)}&type=track`, {
                        headers: {
                            'Authorization': process.env.REACT_APP_ACCESS_TOKEN,
                        }
                    })
                    .then(response => {
                        const songData = response.data.tracks.items[0];
                        return {
                            ...music,
                            image: songData.album.images[0]?.url || null,
                        };
                    })
                );

                Promise.all(songPromises)
                    .then(responses => {
                        setMusicImg(responses);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    const handleYearBtn = (year) => {
        const filteredByYear = musicData.filter(item => item.Year === year);
        setSelectedYear(year);

        const soungCounts = filteredByYear.reduce((counts, song) => {
            const key = `${song.artist} - ${song.track}`;
            counts[key] = (counts[key] || 0) + 1;
            return counts
        }, {});

        const uniqueSongs = Array.from(new Set(filteredByYear.map(song => `${song.artist} - ${song.track}`)))
        const filteredWithCounts = uniqueSongs.map(songKey => {
            const [artistName, songName] = songKey.split(' - ');
            return {
                artist: artistName,
                track: songName,
                Count: soungCounts[songKey]
            }
        });

        const sortByCount = filteredWithCounts.sort((a, b) => b.Count - a.Count);
        setFilteredData(sortByCount);
    };

    // TO FIND HOW MANY SONGS WERE LISTENED TO IN A YEAR
    const totalSongs = filteredData.length;

    // TO FIND WHAT ARTIST WAS THE MOST LISTENED TO IN A YEAR
    const mostListenedArtist = filteredData.reduce((maxArtist, currentArtist) => {
        if (!maxArtist || currentArtist.Count > maxArtist.Count) {
            return currentArtist;
        }
        return maxArtist
    }, null)
    


    return (
        <div className='years-container'>
            <div className='years-btn-container'>
                {yearData && yearData.map((year) => (
                    <button key={year} onClick={() => handleYearBtn(year)}>{year}</button>
                ))}
            </div>
           
            <div className='years-btn-results'>
                <h3>Total songs: {totalSongs} </h3>
                <h3>Most Listened Artist This Year: {mostListenedArtist && mostListenedArtist.artist} - {mostListenedArtist && mostListenedArtist.Count} </h3>
                <ul className="songs-list">
                    {selectedYear && filteredData && filteredData.map(song => (
                        <li key={song.id}>
                            <div className="album-cover-container">
                                {song.image && <img src={song.image} alt={`${song.track} album cover`} />} 
                            </div>
                            {song.artist} - {song.track} &nbsp; <span className='song-count'>{song.Count === 1 ? 'Appears 1 time' : `Appears ${song.Count} times`}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ByYearBtn;
