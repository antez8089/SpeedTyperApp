import { useState, useEffect } from "react";
import Keyboard from "../components/Keyboard";
import TypingInput from "../components/TypingInput";
import api from"../api/axiosConfig"


function KeyboardPage() {

  const [words, setWords] = useState([]);

  const getWords = async () => {
    const response = await api.get("/words", {
        params: {
            num: 63,
            len: 5
        }
    });
    setWords(response.data)
  }

  useEffect(() => {
    getWords()
  }, [])
  
  return (
    <div className="page-wrapper">
      <div className="stats-container side-container">
      <div id="wpm-label">WPM</div>
      <span id="wpm"></span>
      <div id="wpm-label">Accuracy</div>
      <span id="accuracy"></span>
      </div>
      <div className='container'>
        <div className="text-container">
          <TypingInput words={words}></TypingInput>
        </div>
        <Keyboard></Keyboard>
      </div>
      <div className="hero-container side-container"></div>
    </div>
  );
}

export default KeyboardPage;