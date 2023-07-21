import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../../server';
import PlaylistCard from './PlaylistCard';
import './PlaylistComponents.css';

const PlaylistsSpotify = ({filter, sortOrder}) => {
    const [results, setResults] = useState([])
    
    useEffect(() => {
        axios.get(`https://api.spotify.com/v1/me`, {
            headers: {
            "Authorization": process.env.REACT_APP_ACCESS_TOKEN, 
            }
        })
            .then(response => {
                setResults(response.data)
                console.log(results);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);
    
    return (
        <>

        </>
    )
}

export default PlaylistsSpotify