import "./CardModal.css";
import MovieTrailer from "./MovieTrailer";

const CardModal = ({ movie, onClose }) => {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1>{movie.title}</h1>
        <img
          className="img"
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
        />
        <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
        <p><strong>Release date:</strong> {movie.release_date}</p>
        <p><strong>Overview:</strong> {movie.overview}</p>
        <p><strong>Genres:</strong> {movie.genres?.map((g) => g.name).join(",")}</p>
        <MovieTrailer trailerKey={movie.trailerKey} />
        <button className="close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CardModal;
