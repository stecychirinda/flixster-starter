function MovieTrailer({ trailerKey }) {
  if (!trailerKey) return null;

  const trailerUrl = `https://www.youtube.com/embed/${trailerKey}`;

  return (
    <div className="trailer">
      <iframe
        width="560"
        height="315"
        src={trailerUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default MovieTrailer;
