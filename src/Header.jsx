import "./Header.css"
import "./SearchBar"
import SearchBar from "./SearchBar"

function Header() {
    const handleSubmit = (movieTitle) => {
        console.log("Searching for movie:", movieTitle)
    };
    return(
        <div className="header">
            <h1>Welcome to Flixster</h1>
            <div>
                <SearchBar onMovieTitle={handleSubmit}/>
            </div>
        </div>
    )}


export default Header
