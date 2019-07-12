import React, {createRef, useState} from 'react';
import './App.css';

const MovieList = (props) => {
  return (
    <div>
      {props.movies.map(movie => <Movie key={movie.id} {...movie}/>)}
    </div>
  );
}

const Movie = (props) => {
  let releaseYear = props.release_date.split('-')[0];
  let score = props.vote_average;
  return (
    <div className="movie">
      <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${props.poster_path}`}/>
      <div className="movie-details">
        <h2>{props.title} <span className="year">{releaseYear}</span></h2>
        <p>{props.overview}</p>
        <p style={{color: (score > 5 ? 'green' : 'red')}}>{score}</p>
        </div>
    </div>
  );
}

const Search = (props) => {
  const input = createRef();
  const submitSearch = async (event) => {
    event.preventDefault();
    props.clear();
    try{
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=${input.current.value}&language=en-US&api_key=9e9995195d663f583df605660d2316f5`);
      const data = await response.json();
      props.onSubmit(data.results);
      input.current.value = " ";
    } catch (error){
      throw(error);
    }
  }
  return (
    <div>
      <form onSubmit={submitSearch}>
        <input type="text" ref={input} placeholder="Search for a movie" required/>
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
  const clearSearch = () => {
    setData([]);
  }
  return (
    <div className="App">
      <h1>{props.title}</h1>
      <Search clear={clearSearch} onSubmit={generateList}/>
      <MovieList movies={data}/>
    </div>
  );
}

export default App;
