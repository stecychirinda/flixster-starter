import "./MovieCard.css"

function MovieCard({title,url,rating }) {
  const formattedRating = rating.toFixed(2);
  return (
    <div className="movie">
      <img className="img"src={`https://image.tmdb.org/t/p/w500${url}`} alt={title} />
      <div className="movie-info">
        <h3>{title}</h3>
        <span className={`tag ${rating >= 8 ? "green" : "orange"}`}>
          {formattedRating}
        </span>
      </div>
      </div>)
}

export default MovieCard
