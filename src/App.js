import React, {createRef, useState} from 'react';
import './App.css';

const MovieList = (props) => {
  return (
    <div>
      {props.movies.map(movie => <Movie {...movie}/>)}
    </div>
  );
}

const Movie = (props) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.release_date}</p>
      <p>{props.overview}</p>
      <p>{props.vote_average}</p>
    </div>
  );
}

const Search = (props) => {
  const input = createRef();
  const submitSearch = async (event) => {
    event.preventDefault();
    try{
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=${input.current.value}&language=en-US&api_key=9e9995195d663f583df605660d2316f5`);
      const data = await response.json();
      props.onSubmit(data.results);
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
  const [data, setData] = useState([]);
  const generateList = (moviesData) => {
      setData(prevState => [...prevState,...moviesData]);
  }
  return (
    <div>
      <h1>{props.title}</h1>
      <Search onSubmit={generateList}/>
      <MovieList movies={data}/>
    </div>
  );
}

export default App;
