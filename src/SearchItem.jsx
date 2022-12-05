import React, { useEffect } from 'react'

export default function SearchItem(props) {

    const { movie } = props;

    useEffect(() => {

    }, [])


    return (
        <div className='search-result-container'>
            <div className='movie-title'>{movie.Title}</div>
            <div className='movie-detail-container'>
                <div className='movie-info'>
                    <div><i className="fa fa-phone search-icon"></i>{movie.Type}</div>
                    <div><i className="fa fa-at search-icon"></i>{movie.Year}</div>
                </div>
                <div className='movie-imdb-id'>
                    <i class="fa fa-file search-icon"></i>
                    {movie.imdbID} | {movie.imdbID}
                </div>
            </div>
        </div>
    )
}
