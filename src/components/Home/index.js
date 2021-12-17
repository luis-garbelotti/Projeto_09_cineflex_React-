import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../Loading';

export default function Home({ movies, setMovies }) {

    useEffect(() => {
        const moviesRequisition = axios.get("https://mock-api.driven.com.br/api/v4/cineflex/movies");

        moviesRequisition.then((mov) => {
            setMovies(mov.data);
        });
    }, []);

    if (!movies) {
        return <Loading />
    }

    return (
        <>

            <HomeHeader className='flex-center'>

                <h2>Selecione o filme</h2>

            </HomeHeader>

            <MovieList className='flex-center'>
                {movies.map((mv) =>
                (
                    <Movie className='flex-center pointer' key={mv.id} >
                        <Link to={`/sessoes/${mv.id}`} state={{ posterURL: mv.posterURL }} >
                            <img src={mv.posterURL} alt={mv.title} />
                        </Link>
                    </Movie>
                )
                )}
            </MovieList>

        </>
    )
}

const HomeHeader = styled.div`
    width: 100%;
    height: 100px;
    
    margin-top: 67px;

    h2 {
        font-size: 24px;
        font-weight: 400;
        line-height: 28px;
        letter-spacing: 0.04em;
        text-align: center;

        color: #293845;

        width: 100%;
    }
`

const MovieList = styled.ul`
    flex-wrap: wrap;
`

const Movie = styled.div`
    width: 145px;
    height: 209px;

    margin: 0 15px 11px 15px;

    box-shadow: 0px 1px 5px 3px rgba(0, 0, 0, 0.1);

    border-radius: 3px;

    img {
        width: 129px;
    }
`