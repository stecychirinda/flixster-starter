import "./MovieList.css"
import MovieCard from "./MovieCard.jsx"


function FavoriteList({ favorites }) {

return (
    <>
        <div className="movie-list">
            {favorites.map((movie, index) => (
                <MovieCard
                    key={`{movie.id}-${index}`}
                    title={movie.title}
                    url={movie.poster_path}
                    rating={movie.vote_average}
                    onClick={() => { }}
                    onLike={() => { }}
                />
            ))}
        </div>
    </>
)
}
export default FavoriteList
