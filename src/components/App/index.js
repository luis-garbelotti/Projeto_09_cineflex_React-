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

    return (
        <BrowserRouter>
            <TopBar />
            <Routes>
                <Route path="/" element={<Home movies={movies} setMovies={setMovies} />}> </Route>
                <Route path="/sessoes/:idFilme" element={<Sessions movie={movie} setMovie={setMovie} />}> </Route>
                <Route path="/assentos/:idSessao" element={<Seats movie={movie} setMovie={setMovie} />}> </Route>
            </Routes>
        </BrowserRouter>
    )
}