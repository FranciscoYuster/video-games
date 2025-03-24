import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameDetail from './pages/GameDetail';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GameDetail />} />
      </Routes>
    </div>
  );
}

export default App;
