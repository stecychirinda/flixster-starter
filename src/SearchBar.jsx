import React from 'react'
import './SearchBar.css'

function SearchBar({ onMovieTitle}) {

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const movieName = formData.get('movie-title')
    onMovieTitle(movieName)
    event.target.reset();

  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input className="search-input" type="text" name="movie-title" placeholder="Enter movie title" />
      <button className="search-button" type="submit">🔍 Search</button>
    </form>
  );
}

export default SearchBar
