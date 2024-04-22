import { HashRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext.jsx';
import { Navigate } from 'react-router-dom';
import HomePage from './pages/home.js';
import KeyboardPage from './pages/keyboardPage.js';
import WordsPage from './pages/wordsPage.js';
import NavBar from './components/NavBar.js';
import SignUpPage from './pages/signUpPage.js';
import LoginPage from './pages/loginPage.js';
import UserPage from './pages/userPage.js';


function App() {

  const { isAuthenticated } = useAuth();

  return (
    <HashRouter>
      <NavBar />
      <Routes>
        {/* <Route path='/' element={<HomePage/>} /> */}
        <Route path='/' element={<KeyboardPage/>} />
        {/* <Route path='/words' element={<WordsPage/>} /> */}
        <Route path='/sign-up' element={<SignUpPage/>} />
        <Route path='/login' element={!isAuthenticated ? <LoginPage/> : <Navigate to='/user' />} />
        <Route path='/user' element={isAuthenticated ? <UserPage/> : <Navigate to='/login' />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
