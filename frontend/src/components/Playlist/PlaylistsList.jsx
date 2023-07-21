import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../../server';
import PlaylistCard from './PlaylistCard';
import './PlaylistComponents.css';

const PlaylistsList = ({filter, sortOrder}) => {
    const [results, setResults] = useState([])

    useEffect(() => {
        axios.get('/api/seasons')
            .then(res => {
                setResults(res.data[0])
                console.log(results);
            })
            .catch(err => {
                console.error(err);
            })
    }, [filter, sortOrder])
    
    return (
        <div className='playlist-container'>
            {results && results.map((result, index) => {
                return <Link key={index} to={`/library/${result.name.toLowerCase()}`}><PlaylistCard year={result.year} season={result.season} /></Link>
            })}
        </div>
    )
}

export default PlaylistsList