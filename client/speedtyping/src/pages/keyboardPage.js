import { useState, useEffect } from "react";
import Keyboard from "../components/Keyboard";
import TypingInput from "../components/TypingInput";
import api from"../api/axiosConfig";
import { useLocation } from "react-router-dom";

function KeyboardPage({ endGame }) {
  console.log("Received prop endGame:", endGame); // Dodane logowanie

  const location = useLocation();
  const { userWords } = location.state || { userWords: [] };

  const [words, setWords] = useState([]);

  const getWords = async () => {
    const response = await api.get("/words", {
      params: {
        num: 63,
        len: 5
      }
    });
    setWords(response.data);
  };

  useEffect(() => {
    if (userWords && userWords.length > 0) {
      setWords(userWords);
    } else {
      getWords();
    }
  }, []);

  return (
    <div className="page-wrapper">
      <div className="stats-container side-container">
        <div id="wpm-label">WPM</div>
        <span id="wpm"></span>
        <div id="wpm-label">Accuracy</div>
        <span id="accuracy"></span>
      </div>
      <div className="container">
        <div className="text-container">
          <TypingInput words={words} isMultiplayer={false}></TypingInput>
        </div>
        <Keyboard></Keyboard>
        <button onClick={() => { console.log("Button clicked"); endGame(); }} className="mt-custom mb-4 bg-red-600 text-white py-3 px-6 rounded hover:bg-red-800">
          Zakończ Grę
        </button>
      </div>
      <div className="hero-container side-container"></div>
    </div>
  );
}

export default KeyboardPage;