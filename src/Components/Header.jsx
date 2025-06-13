import "./Header.css"
import SearchBar from "./SearchBar"

function Header ({onSearch,onClear}){
    return(
        <div className="header">
            <SearchBar onMovieTitle={onSearch} onClear={onClear}/>
        </div>
    )
}

export default Header;
