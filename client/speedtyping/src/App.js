import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home.js';
import KeyboardPage from './pages/keyboardPage.js';
import WordsPage from './pages/wordsPage.js';
import NavBar from './components/NavBar.js';
// import SignUpPage from './pages/SignUpPage.js';



function App() {
  return (
    <HashRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/keyboard' element={<KeyboardPage/>} />
        <Route path='/words' element={<WordsPage/>} />
        {/* <Route path='/sign-up' element={<SignUpPage/>} /> */}
      </Routes>
    </HashRouter>
  );
}

export default App;
