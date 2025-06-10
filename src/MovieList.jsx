import "./MovieList.css"
import { useState, useEffect } from 'react'
import MovieCard from "./MovieCard.jsx"

function MovieList() {
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const fetchData = async (pageToFetch) => {

            const apiKey = import.meta.env.VITE_API_KEY
            const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1${pageToFetch}`;
            const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOGI2N2MyMDMzOGE1OGIxNGE4MWU3NGEzMjEwZDk0NyIsIm5iZiI6MTc0OTUwOTc1MC4yMjg5OTk5LCJzdWIiOiI2ODQ3NjY3NmU5Y2E4YTdiM2MzZmNjMTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Qf1y307rFLFYgFWJtkMGUzyoYMhh25W5QDzQmVO0Hv8`
            }
            };
            console.log("Fetching my data now")

                fetch(url, options)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setMovies(data.results)
                    setError(null)
                    if (pageToFetch >= data.total_pages){
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
          fetchData(page)
        //console.log("fetching data",page)
    }, []);

    // useEffect(() =>{
    // const loadMore = () => {
    //     const newPage = page + 1
    //     setMovies((movies)=> [...movies, ...data.results])
    //     setPage(newPage)
    //     fetchData(newPage)
    // }
    // }, []);

    const loadMore = () =>{
        console.log("loadMore")
        const statePage = page + 1
        console.log(statePage)
        setPage(statePage)
        fetchData(statePage)


    }

    return (
        <>
            <div className="movie-list">
                {isLoading && <div>Loading...</div>}
                {error && <p>{error}</p>}
                {movies.map((movie,index) => (
                    <MovieCard
                        key={`{movie.id}-${index}`}
                        title={movie.title}
                        url={movie.poster_path}
                        rating={movie.vote_average}
                    />
                ))}
            </div>
            {!isLoading && hasMore && (
                <button onClick={loadMore}>Load More Movies</button>
            )}
            {!hasMore && <p>End of Now Playing Movies</p>}
        </>
    )
}

export default MovieList
