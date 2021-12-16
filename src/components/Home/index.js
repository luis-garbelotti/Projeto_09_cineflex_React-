import axios from 'axios'
import { useState, useEffect } from 'react'
import './style.css'

export default function Home() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const movieRequisition = axios.get("https://mock-api.driven.com.br/api/v4/cineflex/movies");

        movieRequisition.then((mov) => {
            setMovies(mov.data);
        });
    }, []);


    return (
        <>
            <div className="home">
                <div className='home-top flex-center'>

                    <h2>Selecione o filme</h2>

                </div>

                <ul className='movie-list flex-center'>
                    {movies.map((mv) =>
                    (
                        <div className='movie flex-center pointer'>
                            <img src={mv.posterURL} alt={mv.title} />
                        </div>
                    )
                    )}
                </ul>
            </div>
        </>
    )
}