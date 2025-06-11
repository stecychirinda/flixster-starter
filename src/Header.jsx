import "./Header.css"
import SearchBar from "./SearchBar"

function Header ({onSearch,onClear}){
    return(
        <div className="header">
            <h1>Welcome to Flixster</h1>
            <SearchBar onMovieTitle={onSearch} onClear={onClear}/>
        </div>
    )
}

export default Header;
