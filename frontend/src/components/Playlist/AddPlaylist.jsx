import { useState } from 'react';
import axios from '../../server';
import './PlaylistComponents.css';

const AddPlaylist = () => {

    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const season = e.target.season.value;
        const year = e.target.year.value;
        const playlistName = season+year;
        axios.post('/api/seasons', { season, year, name: playlistName })
            .then(res => {
                e.target.reset();
                setShowForm(false);
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <>
            <div className="add-playlist-btn" onClick={() => setShowForm(!showForm)}>
                <p>+</p>
            </div>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <input type='text' id='season' placeholder='Season of the playlist' />
                    <input type='number' id='year' placeholder='Year of the playlist' />
                    <button type='submit'>Add new playlist</button>
                </form>
            )}
        </>
        
    )
}

export default AddPlaylist