import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home";
import TopBar from "../TopBar";
import Sessions from "../Sessions";
import Seats from "../Seats";
import '../styles/style.css'
import { useState } from "react";

export default function App() {

    const [movie, setMovie] = useState(null);
    const [movies, setMovies] = useState(null);
    const [rota, setRota] = useState('/');

    return (
        <BrowserRouter>
            <TopBar rota={rota} />
            <Routes>
                <Route path="/" element={<Home rota={rota} setRota={setRota} movies={movies} setMovies={setMovies} />}> </Route>
                <Route path="/sessoes/:idFilme" element={<Sessions rota={rota} setRota={setRota} movie={movie} setMovie={setMovie} />}> </Route>
                <Route path="/assentos/:idSessao" element={<Seats rota={rota} setRota={setRota} movie={movie} setMovie={setMovie} />}> </Route>
            </Routes>
        </BrowserRouter>
    )
}