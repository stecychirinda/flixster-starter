import "./MovieList.css"
import { useState, useEffect } from 'react'
import MovieCard from "./MovieCard.jsx"
import CardModal from "./CardModal.jsx"
const apiSecret = import.meta.env.VITE_API_SECRET


function MovieList({ sortResults, movies, setMovies ,results,handleFavorite,handleWatched}) {
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
                setMovies([...movies, ...data.results])
                setError(null)
                if (pageToFetch >= data.total_pages) {
                    setHasMore(false)
                }
                setIsLoading(false)
            })
            .catch(err => {
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
        const statePage = page + 1
        setPage(statePage)
        fetchData(statePage)
    }
    const handleModal = async (movie_id) => {
        try{
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiSecret}`);
            const dataSet = await response.json();

            const trailerResult = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${apiSecret}`);
            const trailerData = await trailerResult.json();

            const trailer = trailerData.results.find(
                (vid)=> vid.type ==="Trailer" && vid.site ==="YouTube"
            );
            const fullData ={
                ...dataSet,
                trailerKey: trailer?.key || null,
            };
        setSelectedCard(fullData);
    } catch(error){
    }
}
    const getCurrentData = () => {
        console.log('sortResults: ', sortResults)
        if(sortResults.length > 0) {
            return sortResults
        }
        else if (results.length>0){
            return results
        }else {
            return movies
        }
    }

return (
    <>
        <div className="movie-list">
            {isLoading && <div>Loading...</div>}
            {error && <p>{error}</p>}
            {getCurrentData().map((movie, index) => (
                <MovieCard
                    key={`{movie.id}-${index}`}
                    title={movie.title}
                    url={movie.poster_path}
                    rating={movie.vote_average}
                    onClick={() => handleModal(movie.id)}
                    onLike ={()=> handleFavorite(movie)}
                    onWatched ={()=> handleWatched(movie)}
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
