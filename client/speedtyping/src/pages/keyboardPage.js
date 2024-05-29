import { useState, useEffect } from "react";
import Keyboard from "../components/Keyboard";
import TypingInput from "../components/TypingInput";
import api from"../api/axiosConfig";
import { useLocation } from "react-router-dom";
import Modal from "../components/Modal";

function KeyboardPage() {

  const location = useLocation();
  const { userWords } = location.state || { userWords: [] };

  const [words, setWords] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);

  const handlePlayAgain = () => {
    setShowModal(false);
    window.location.reload();
  };

  const handleEndForToday = () => {
    setShowModal(false);
  };

  const endGame = () => {
    setShowModal(true);
    setIsGameEnded(true);
  };

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
          <TypingInput words={words} isGameEnded={isGameEnded} isMultiplayer={false}></TypingInput>
        </div>
        <Keyboard></Keyboard>
      </div>
      <div className="hero-container side-container">
      <button onClick={endGame} className="mt-custom mb-2 bg-red-600 text-white py-3 px-6 rounded hover:bg-red-800">
          END
        </button>
      </div>
      <Modal 
        show={showModal}
        handlePlayAgain={handlePlayAgain}
        handleEndForToday={handleEndForToday}
      />
    </div>
  );
}

export default KeyboardPage;