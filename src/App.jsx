import { useState } from 'react';
import './App.scss'
import SearchItem from './SearchItem'

function App() {

  const [searchResult, setSearchResult] = useState([])
  const [searchTimeout, setSearchTimeout] = useState()

  const inputHandler = async (searchText) => {

    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    if (searchText.length > 2) {
      const timeout = setTimeout(async () => {
        try {
          let copySearchResult = []
          const idSearchResponse = await fetch(`http://www.omdbapi.com/?apikey=6d385060&i=${searchText}`)
          const titleSearchResponse = await fetch(`http://www.omdbapi.com/?apikey=6d385060&s=${searchText}`)
          const idSearchJson = await idSearchResponse.json()
          const titleSearchJson = await titleSearchResponse.json()

          if (titleSearchJson.Response === 'True') {
            copySearchResult = [...titleSearchJson.Search]
          }
          if (idSearchJson.Response === 'True') {
            copySearchResult.push({
              Poster: idSearchJson.Poster,
              Title: idSearchJson.Title,
              Type: idSearchJson.Type,
              Year: idSearchJson.Year,
              imdbID: idSearchJson.imdbID
            })
          }

          setSearchResult(copySearchResult);
        } catch (error) {
          console.error(error);
        }
      }, 250);
      setSearchTimeout(timeout);
    }

  }

  return (
    <div className="App">
      <div className='search-container'>
        <div className='search-bar'>
          <i className="fa fa-search search-icon"></i>
          <input onInput={(event) => { inputHandler(event.target.value) }} className='input-bar' type="text" placeholder='SEARCH (MOVIE Title/MOVIE IMDb ID)' />
        </div>
        <div className='search-list'>
          {searchResult.map(movie =>
            <SearchItem movie={movie}></SearchItem>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
