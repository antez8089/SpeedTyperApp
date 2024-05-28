import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext.jsx';
//import { Navigate } from 'react-router-dom';
import HomePage from './pages/home.js';
import KeyboardPage from './pages/keyboardPage.js';
import Ranking from './pages/Ranking.js';
import WordsPage from './pages/wordsPage.js';
import NavBar from './components/NavBar.js';
import SignUpPage from './pages/signUpPage.js';
import LoginPage from './pages/loginPage.js';
import UserPage from './pages/userPage.js';
import MultiPlayerPage from './pages/multiPlayerPage.js';
import Modal from './components/Modal';
import './index.css';  

function App() {
  const { isAuthenticated } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handlePlayAgain = () => {
    console.log("GRAJ DALEJ clicked");
    setShowModal(false);
    
  };

  const handleEndForToday = () => {
    console.log("KONIEC NA DZIŚ clicked");
    window.location.href = "/"; 
  };

  const endGame = () => {
    console.log("End Game clicked");
    setShowModal(true);
  };

  if (isAuthenticated === null) {
    return <h1 className='bg-white'>Loading</h1>
  }

  return (
    <HashRouter>
      <NavBar />
      <Routes>
        {/* <Route path='/' element={<HomePage/>} /> */}
        <Route path='ranking' element={<Ranking/>} />
        <Route path='/' element={<KeyboardPage endGame={endGame} />} />
        {/* <Route path='/words' element={<WordsPage/>} /> */}
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/login' element={!isAuthenticated ? <LoginPage /> : <Navigate to='/user' />} />
        <Route path='/user' element={isAuthenticated ? <UserPage /> : <Navigate to='/login' />} />
        <Route path='/fight' element={isAuthenticated ? <MultiPlayerPage /> : <Navigate to='/login' />} />
      </Routes>
      <Modal 
        show={showModal}
        handlePlayAgain={handlePlayAgain}
        handleEndForToday={handleEndForToday}
      />
    </HashRouter>
  );
}

export default App;
