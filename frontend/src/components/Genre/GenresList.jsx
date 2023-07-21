import { useState, useEffect } from "react";
import axios from "axios";
import GenreCard from "./GenreCard";

const GenresList = () => {
    const [genres, setGenre] = useState([]);

    useEffect(() => {
        axios.get("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
          })
        .then((res) => res.data.genres)
        .then((data) => setGenre(data))
    }, [])

    return (
        <div className="cards-container">
            {genres &&
                genres.map((genre) =>
                <GenreCard key={genre} genre={genre}/> )
            }
        </div>
    )
}

export default GenresList