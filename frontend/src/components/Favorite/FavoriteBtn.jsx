import { useState } from 'react';
import { RiHeartAddFill, RiHeartFill } from 'react-icons/ri'
import './FavoriteBtn.css';

const FavoriteBtn = () => {
    const [favorite, setFavorite] = useState(false);

    const handleFavorite = () => {
        setFavorite(!favorite);
      }    

    return (!favorite ? <RiHeartAddFill onClick={handleFavorite}/> : <RiHeartFill onClick={handleFavorite} style={{fill: "red"}}/>)
}

export default FavoriteBtn;