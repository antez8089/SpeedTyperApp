import { useState, useEffect } from "react";
import Keyboard from "../components/Keyboard";
import TypingInput from "../components/TypingInput";
import api from"../api/axiosConfig"


function KeyboardPage() {

  const [words, setWords] = useState([]);

  const getWords = async () => {
    const response = await api.get("/words", {
        params: {
            num: 9,
            len: 7
        }
    });
    setWords(response.data)
  }

  useEffect(() => {
    getWords()
  }, [])
  
  return (
    <div className='container'>
      <div className="text-container">
        <h4>Let's Type!</h4>
        <div id="wpm">WPM: </div>
        <TypingInput words={words}></TypingInput>
      </div>
      <Keyboard></Keyboard>
    </div>
  );
}

export default KeyboardPage;