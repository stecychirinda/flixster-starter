import "./MovieList.css"
import MovieCard from "../MovieCard.jsx"


function WatchedList({ watched }) {

return (
    <>
        <div className="movie-list">
            {watched.map((movie, index) => (
                <MovieCard
                    key={`{movie.id}-${index}`}
                    title={movie.title}
                    url={movie.poster_path}
                    rating={movie.vote_average}
                    onWatched={()=>{}}
                />
            ))}
        </div>
    </>
)
}
export default WatchedList
