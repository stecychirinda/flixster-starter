import { useEffect, useState } from 'react'
import './App.css'
import MovieList from './MovieList'
import Header from './Header'
import Footer from './Footer'

const apiSecret = import.meta.env.VITE_API_SECRET

const App = () => {
  const [movies, setMovies] = useState([])
  const [results, setResults] = useState([])
  const [sortResults, setSortResults] = useState([])
  const [error, setError] = useState("")
  const [sortCriteria, setSortCriteria] = useState('')

  useEffect(() => {
    let tempResults = [...movies]
    let newResults = []
    if (sortCriteria === "original_title"){
      newResults = tempResults.sort((a,b) =>{
        if (a.title && b.title) return a.title.localeCompare(b.title);
        return 0;
      })
    }
    if (sortCriteria === "release_date"){
      newResults = tempResults.sort((a,b) =>{
        new Date(a.release_date) - new Date(b.release_date);
      })
    }
    if (sortCriteria === "vote_average"){
      newResults = tempResults.sort((a,b) =>{
       return b.vote_average - a.vote_average
      })
    }
      setSortResults(newResults)
  }, [sortCriteria,movies])

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
    setResults(data.results);

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
      <h1>Welcome to Flixster</h1>

      <select className="select"
        defaultValue={""}
        onChange={(e)=> setSortCriteria(e.target.value) }>
        <option value="">Sort by</option>
        <option value="original_title">A-Z</option>
        <option value="release_date">Release Date</option>
        <option value="vote_average">Rating</option>
      </select>

      <Header onSearch={fetchMovie} onClear={clearSearch}/>
      {error && <p className="error">{error}</p>}
      <MovieList sortResults={sortResults.length > 0 ? sortResults : []}  results={results.length>0? results: []} movies={movies} setMovies={setMovies} />

      <Footer />
    </div>
  )
};

export default App;
