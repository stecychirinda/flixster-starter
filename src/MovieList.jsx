import "./MovieList.css"
import { useState, useEffect } from 'react'
import MovieCard from "./MovieCard.jsx"
import { use } from "react"


function MovieList() {
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

useEffect(() => {
    const fetchData = async () =>{
    const apiKey = import.meta.env.VITE_API_KEY
    try{
    const response =  await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`)
    const data = await response.json();
    if (response.ok){
        setMovies(data.results);
        setError(null);
    }else {
        setError(data.status_message || "Error fetching data");
    }
    }catch (err){
        setError("Network error or invalid API key");
    }
    finally{
        setIsLoading(false);
    }
};
fetchData();
}, []);

    return(
        <div className="movie-list">
            {isLoading && <div>Loading...</div>}
            {error && <p>{error}</p>}
            {movies.map(movie => <MovieCard key={movie.id} title={movie.title}
            url={movie.backdrop_path} rating={movie.vote_average}/>)}
        </div>
    )
}
 export default MovieList
