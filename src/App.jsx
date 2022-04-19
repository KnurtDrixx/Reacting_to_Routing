import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Films from "./pages/Films";
import Characters from "./pages/Characters";
import FilmPage from "./pages/FilmPage";
import CharacterPage from "./pages/CharacterPage";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/films" element={<Films />} />
        <Route path="/films/:filmid" element={<FilmPage />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:characterid" element={<CharacterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
