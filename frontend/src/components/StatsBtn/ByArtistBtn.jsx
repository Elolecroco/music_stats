import axios from '../../server';
import { useEffect, useState } from 'react';
import './StatsBtn.css';

const ByArtistBtn = () => {
    const [artistsData, setArtistsData] = useState([]);
    const [filteredData, setFilteredData] = useState(artistsData);

    useEffect(() => {
        axios.get(`/api/playlists`)
            .then(res => {
                const uniqueArtists = [...new Set(res.data[0].map(item => item.artist))]
            setArtistsData(uniqueArtists);
            setFilteredData(res.data[0]);
            })
    }, [])

    

    return (
        <button>By Artist</button>
    )
}

export default ByArtistBtn;