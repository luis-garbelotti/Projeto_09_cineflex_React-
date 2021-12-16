import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home";
import TopBar from "../TopBar";

export default function App() {
    return (
        <BrowserRouter>
            <TopBar />
            <Routes>
                <Route path="/" element={<Home />}> </Route>
            </Routes>
        </BrowserRouter>
    )
}