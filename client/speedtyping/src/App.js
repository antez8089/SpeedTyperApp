import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useAuth } from './contexts/AuthContext.jsx';
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
  const [key, setKey] = useState(0); // Dodaj stan klucza do resetowania

  const handlePlayAgain = () => {
    console.log("ONE MORE GAME clicked");
    setShowModal(false);
    setKey(prevKey => prevKey + 1); // Zwiększ klucz, aby wymusić ponowne renderowanie komponentu
  };

  const handleEndForToday = () => {
    console.log("FINISH clicked");
    setShowModal(false);
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
<<<<<<< HEAD
        {/* <Route path='/' element={<HomePage/>} /> */}
        <Route path='ranking' element={<Ranking/>} />
        <Route path='/' element={<KeyboardPage endGame={endGame} />} />
        {/* <Route path='/words' element={<WordsPage/>} /> */}
=======
        <Route path='ranking' element={<Ranking />} />
        <Route path='/' element={<KeyboardPage key={key} endGame={endGame} />} />
>>>>>>> 0212208 (finish button completed)
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/login' element={!isAuthenticated ? <LoginPage /> : <Navigate to='/user' />} />
        <Route path='/user' element={isAuthenticated ? <UserPage /> : <Navigate to='/login' />} />
        <Route path='/fight' element={isAuthenticated ? <MultiPlayerPage endGame={endGame} /> : <Navigate to='/login' />} />
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
