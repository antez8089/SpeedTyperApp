import { useState } from "react";
import api from '../api/axiosConfig.js'

  
function WordsPage() {
    const [words, setWords] = useState();
    const [numberOfWords, setNumberOfWords] = useState(1);

    const getWords = async () => {
        const response = await api.get("/words", {
            params: {
                num: numberOfWords
            }
        });
        setWords(response.data);
    }

    const buttonClick = () => {
        getWords();
    }

    const inputChange = (e) => {
        setNumberOfWords(e.target.value)
    }

    return (
        <div>
            <input type="number" value={numberOfWords} onChange={inputChange} />
            <button onClick={buttonClick}>Get Words</button>
            <div>{words}</div>
        </div>
    );
}

export default WordsPage;
