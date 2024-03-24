import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home.js';
import KeyboardPage from './pages/keyboardPage.js';
import WordsPage from './pages/wordsPage.js';


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/keyboard' element={<KeyboardPage/>} />
        <Route path='/words' element={<WordsPage/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
