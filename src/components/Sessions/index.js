import { Link, useLocation, useParams } from "react-router-dom"
import { useEffect } from "react";
import styled from "styled-components"
import axios from "axios";
import Loading from "../Loading";
import SessionFooter from "../SessionFooter";

export default function Sessions({ movie, setMovie, posterURL, mvTitle }) {

    const { idFilme } = useParams();
    const location = useLocation();


    useEffect(() => {
        const sessionsRequisiton = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/movies/${idFilme}/showtimes`);

        sessionsRequisiton.then((session) => {
            setMovie(session.data);
        })
    }, []);

    if (!movie) {
        return <Loading />
    }

    return (
        <>
            <Container>

                <SessionsHeader className="flex-center">

                    <h2>Selecione o horário</h2>
                    <img src={posterURL} alt={mvTitle} />

                </SessionsHeader>

                {movie.days.map((day) =>
                    <SessionContent key={day.id}>

                        <h3>{day.weekday} - {day.date}</h3>
                        <div>

                            {day.showtimes.map((time) =>
                                <SessionTime className="flex-center pointer" key={time.id}>
                                    <Link to={`/assentos/${time.id}`} state={{ title: movie.title, time: time.name, imgURL: movie.posterURL }}>
                                        <span>{time.name}</span>
                                    </Link>
                                </SessionTime>
                            )}

                        </div>

                    </SessionContent>
                )}

                <SessionFooter movieTitle={movie.title} location={location} />

            </Container>
        </>
    )
}

const Container = styled.div`
padding-bottom: 120px;
`

const SessionsHeader = styled.div`

    width: 100%;
    height: 100px;
    
    margin-top: 67px;
    margin-bottom: 0;

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

const SessionContent = styled.div`

    margin-left: 23px;

    h3 {

        font-size: 20px;
        font-weight: 400;
        line-height: 23px;
        letter-spacing: 0.02em;

        color: #293845;

    }

    div {

        margin-top: 15px;
        margin-bottom: 15px;
        display: flex;
        
    }
    
`

const SessionTime = styled.div`

    width: 83px;
    height: 43px;
    margin-right: 8px;

    background-color: #E8833A;

    border-radius: 3px;

    span {
        
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 0.02em;

        color: #ffffff;

    }

    a {
        text-decoration: none;
    }
`




