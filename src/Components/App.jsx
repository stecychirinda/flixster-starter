import { useEffect, useState } from "react";
import "./App.css";
import MovieList from "./MovieList";
import Header from "./Header";
import Footer from "./Footer";
import NavBar from "./NavBar";
import FavoriteList from "./FavoriteList";
import WatchedList from "./WatchedList";
import * as FaIcons from "react-icons/fa";


const apiSecret = import.meta.env.VITE_API_SECRET;

const Pages = {
  Home: "HOME",
  Favorites: "FAVORITES",
  Watched: "WATCHED",
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState([]);
  const [results, setResults] = useState([]);
  const [sortResults, setSortResults] = useState([]);
  const [error, setError] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [currentPage, setCurrentPage] = useState(Pages.Home);

  useEffect(() => {
    let tempResults = [...movies];
    let newResults = [];
    if (sortCriteria === "original_title") {
      newResults = tempResults.sort((a, b) => {
        if (a.title && b.title) return a.title.localeCompare(b.title);
        return 0;
      });
    }
    if (sortCriteria === "release_date") {
      newResults = tempResults.sort((a, b) => {
        new Date(a.release_date) - new Date(b.release_date);
      });
    }
    if (sortCriteria === "vote_average") {
      newResults = tempResults.sort((a, b) => {
        return b.vote_average - a.vote_average;
      });
    }
    setSortResults(newResults);
  }, [sortCriteria, movies]);

  const fetchMovie = async (title) => {
    try {
      setError("");
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiSecret}&query=${title}`,
      );
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        setError("No movies found");
        setResults([]);
        return;
      }
      setResults(data.results);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Something went wrong");
    }
  };

  const handleFavorite = (movie) => {
    setFavorites((prev) => {
      const isAlreadyFav = prev.some((fav) => fav.id === movie.id);
      if (!isAlreadyFav) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  const handleWatched = (movie) => {
    setWatched((prev) => {
      const isAlreadyWatched = prev.some((watch) => watch.id === movie.id);
      if (!isAlreadyWatched) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  const clearSearch = () => {
    setResults([]);
    setError("");
  };
  const getCurrentPage = () => {
    switch (currentPage) {
      case Pages.Home:
        return (
          <MovieList
            sortResults={sortResults.length > 0 ? sortResults : []}
            results={results.length > 0 ? results : []}
            movies={movies}
            setMovies={setMovies}
            handleFavorite={handleFavorite}
            handleWatched={handleWatched}
          />
        );
      case Pages.Favorites:
        return <FavoriteList favorites={favorites} />;
      case Pages.Watched:
        return <WatchedList watched={watched} />;
      default:
        <MovieList
          sortResults={sortResults.length > 0 ? sortResults : []}
          results={results.length > 0 ? results : []}
          movies={movies}
          setMovies={setMovies}
          handleFavorite={handleFavorite}
          handleWatched={handleWatched}
        />;
    }
  };
  return (
    <div className="App">
      <h1 className="Title">
        Welcome to FliX
        <FaIcons.FaStar className="icon" />
        </h1>
      <NavBar setCurrentPage={(page) => setCurrentPage(page)} />
      <div className="sort">
        <select
          className="select"
          defaultValue={""}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="original_title">A-Z</option>
          <option value="release_date">Release Date</option>
          <option value="vote_average">Rating</option>
        </select>
        <Header
          className="header"
          onSearch={fetchMovie}
          onClear={clearSearch}
        />
      </div>
      {getCurrentPage()}
      {error && <p className="error">{error}</p>}
      <Footer />
    </div>
  );
};
export default App;
