import "./PlaylistComponents.css"

const PlaylistCard = ({year, season}) => {

    return (
        <div className="playlist-card">
            <h3>{year}</h3>
            <h2>{season}</h2>
        </div>

    )
}

export default PlaylistCard