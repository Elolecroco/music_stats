import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios  from "../server";
import './SongPage.css';

const SongPage = () => {
    const {id} = useParams();
    const [song, setSong] = useState([])
        
        useEffect(() => {
            axios
                .get(`https://api.spotify.com/v1/tracks/${id}`, {
                    headers: {
                        'Authorization': process.env.REACT_APP_ACCESS_TOKEN,
                    }
                })
                .then(res => {setSong(res.data)})
        }, [])

    return (
        <div className='song-page'>
            <h1>{song.name}</h1>
        </div>
    )
}

export default SongPage;