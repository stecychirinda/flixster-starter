import "./Header.css"
import SearchBar from "./SearchBar"
import MovieCard from "./MovieCard"
import {useState} from "react"
const apiSecret = import.meta.env.VITE_API_SECRET;

function Header() {
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const fetchMovie = async (title) => {
        try {
            setError('');
            const response = await fetch (`https://api.themoviedb.org/3/search/movie?api_key=${apiSecret}&query=${title}`);
            const data = await response.json();

            if (!data.results || data.results.length === 0) {
                setError('No movies found');
                setResults([]);
                return;
            }
            const formattedResults = data.results.map((movie) => ({
                    key:movie.id,
                    title:movie.title,
                    url:movie.poster_path,
                    rating:movie.vote_average}))
            setResults(formattedResults);
        } catch (error) {
            console.error('Fetch error: ',error);
            setError('Error fetching movies');
        }
    };
    return(
        <div className="header">
            <h1>Welcome to Flixster</h1>
            <div>
                <SearchBar onMovieTitle={fetchMovie}/>
                {error && <p className="error">{error}</p>}
                {results.map((movie) => (
                <MovieCard
                key={movie.key}
                title={movie.title}
                url={movie.url}
                rating={movie.rating} />
                ))}
            </div>
        </div>
    )}


export default Header
