import React, { useState, useEffect } from 'react'
import axios from '../axios'
import '../Row.css'

const img_baseUrl = "https://image.tmdb.org/t/p/original"

function Row({ title, fetchUrl, isLargeRow }) {

    const [movies, setMovies] = useState([])

    // useEffect to imitate something like componentDidMount()

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            // console.log(request.data.results)
            setMovies(request.data.results)
            return request
        }
        fetchData()
    }, [fetchUrl])

    /*
        if you supply an empty array, the code snippet will run only once when the Row component gets mounted. 
        Supplying the fetchUrl as a parameter makes sure that the code snippet runs every time the fetchUrl changes. 
    */

    // console.log(movies)

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row_posters">
                {movies.map((movie) => (
                    <img
                        key={movie.id}
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`} 
                        src={`${img_baseUrl}${isLargeRow? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name}>
                    </img>
                ))}
            </div>


        </div>
    )
}

export default Row
