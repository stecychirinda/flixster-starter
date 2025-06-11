import "./MovieList.css"
import { useState, useEffect } from 'react'
import MovieCard from "./MovieCard.jsx"
import CardModal from "./CardModal.jsx"
const apiSecret = import.meta.env.VITE_API_SECRET

function MovieList({ }) {
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [selectedCard,setSelectedCard] = useState(null)

    let isDataInitialized = false;

    const fetchData = async (pageToFetch) => {

        const apiKey = import.meta.env.VITE_API_KEY
        const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageToFetch}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`
            }
        };
        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setMovies([...movies, ...data.results])
                setError(null)
                if (pageToFetch >= data.total_pages) {
                    setHasMore(false)
                }
                setIsLoading(false)
            })
            .catch(err => {
                console.error(err)
                setError("Error fetching data");
                setIsLoading(false);
            });

    }

    useEffect(() => {
        if (isDataInitialized) return
        fetchData(page)
        isDataInitialized = true;
    }, []);

    const loadMore = () => {
        console.log("loadMore")
        const statePage = page + 1
        console.log(statePage)
        setPage(statePage)
        fetchData(statePage)

    }
    const handleModal = async (movie_id) => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiSecret}`);
        const dataSet = await response.json();
        setSelectedCard(dataSet);
    }


return (
    <>
        <div className="movie-list">
            {isLoading && <div>Loading...</div>}
            {error && <p>{error}</p>}
            {movies.map((movie, index) => (
                <MovieCard
                    key={`{movie.id}-${index}`}
                    title={movie.title}
                    url={movie.poster_path}
                    rating={movie.vote_average}
                    onClick={() => handleModal(movie.id)}
                />
            ))}
        </div>
        {!isLoading && hasMore && (
            <button onClick={loadMore}>Load More Movies</button>
        )}
        {!hasMore && <p>End of Now Playing Movies</p>}

        {selectedCard && (
            <CardModal movie={selectedCard} onClose={() => setSelectedCard(null)}/>
        )}
    </>
)
}

export default MovieList
