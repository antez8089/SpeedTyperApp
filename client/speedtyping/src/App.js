import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home.js';
import KeyboardPage from './pages/keyboardPage.js';
import WordsPage from './pages/wordsPage.js';
import NavBar from './components/NavBar.js';
import SignUpPage from './pages/signUpPage.js';
import LoginPage from './pages/loginPage.js';


function App() {
  return (
    <HashRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/keyboard' element={<KeyboardPage/>} />
        <Route path='/words' element={<WordsPage/>} />
        <Route path='/sign-up' element={<SignUpPage/>} />
        <Route path='/login' element={<LoginPage/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
