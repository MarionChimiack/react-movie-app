import React, {createRef, useState} from 'react';
import './App.css';


const Search = () => {
  const input = createRef();
  const submitSearch = async (event) => {
    event.preventDefault();
    try{
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=${input.current.value}&language=en-US&api_key=9e9995195d663f583df605660d2316f5`);
      const data = await response.json();
      console.log(data);
    } catch (error){
      console.log(error);
    }
  }
  return (
    <div>
      <form onSubmit={submitSearch}>
        <input type="text" ref={input} placeholder="Search for something" required/>
        <button>Search</button>
      </form>
    </div>
  );
}

const App = (props) => {
  const [data, setData] = useState([{ text: 'Learn Hooks' }]);
  return (
    <div>
      <h1>{props.title}</h1>
      <Search />
    </div>
  );
}

export default App;
