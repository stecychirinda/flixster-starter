import {useState} from 'react'
import './SearchBar.css'

function SearchBar ({onMovieTitle}){
    const [input,setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()){
            onMovieTitle(input.trim());
        }
    };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input className="search-input"
        type="text"
        placeholder="Search for a movie"
        value={input}
        onChange={(e)=> setInput(e.target.value)}/>
      <button className="search-button" type="submit"> Search</button>
    </form>
  );
}

export default SearchBar
