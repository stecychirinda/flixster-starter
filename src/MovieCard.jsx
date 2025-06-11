import "./MovieCard.css"
import {useState} from "react"

function MovieCard({ title, url, rating, onClick}) {

    const [liked,setLiked] = useState(false)
    const [watched,setWatched] = useState(false)

    const handleLike = (e) => {
        e.stopPropagation()
        setLiked(!liked)}

    const handleWatched = (e) => {
        e.stopPropagation()
        setWatched(!watched)}

    const formattedRating = rating.toFixed(2);
    return (
        <div className="movie" onClick={onClick}>
            <img className="img" src={`https://image.tmdb.org/t/p/w500${url}`} alt={title} />
            <div className="movie-info">
                <h3>{title}</h3>
                <span className={`tag ${rating >= 8 ? "green" : "orange"}`}>
                    {formattedRating}
                </span>
                <button className="like" onClick={handleLike}>{liked?"❤️":"🤍"}</button>
                <button className="watched" onClick={handleWatched}>{watched?"👀":"👁"}</button>
            </div>
        </div>)
}
export default MovieCard
