import { useState } from 'react'
import './App.css'
import MovieList from './MovieList'
import Header from './Header'
import Footer from './Footer'
import MovieCard from './MovieCard'

const apiSecret = import.meta.env.VITE_API_SECRET
const App = () => {

  const [results, setResults] = useState([])
  const [error, setError] = useState("")

  const fetchMovie = async (title)=>{
    try{
      setError("")
      const response = await fetch (`https://api.themoviedb.org/3/search/movie?api_key=${apiSecret}&query=${title}`)
      const data = await response.json();

      if (!data.results || data.results.length === 0){
        setError("No movies found")
        setResults([]);
        return;
    }
    const formattedResults = data.results.map((movie) => ({
      key: movie.id,
      title: movie.title,
      url: movie.poster_path,
      rating: movie.vote_average,
    }));

    setResults(formattedResults);
    } catch (error){
      console.error("Fetch error:",error)
      setError("Something went wrong")
    }
 };
  const clearSearch = () => {
    setResults([]);
    setError("");
  };

  return (
    <div className="App">
      <Header onSearch={fetchMovie} onClear={clearSearch}/>
      {error && <p className="error">{error}</p>}
      {results.length > 0 ? (
        <div className="movie-list">
          {results.map((movie) => (
            <MovieCard key={movie.key} title={movie.title} url={movie.url} rating={movie.rating}/>
          ))}
         </div>
      ) : (
      <MovieList />
      )}
      <Footer />
    </div>
  )
};

export default App;
