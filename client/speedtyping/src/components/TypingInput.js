import React, { useState, useEffect} from 'react'
import useKeyPress from '../hooks/useKeyPress'

function TypingInput({ words }) {

    const lowercaseLetters = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];
    
    const [currentPos, setCurrentPos] = useState(0);
    const [testWords, setTestWords] = useState("");
    const [wordDivs, setWordDivs] = useState([]);
    const [timerStarted, setTimerStarted] = useState(false)
    const [startTime, setStartTime] = useState(null)
    const [timerEnded, setTimerEnded] = useState(false)

    const { keyPressed } = useKeyPress();

    const separateWords = (words) => {
        let i = 0
        let j = 0
        const newWordsDivs = []
        words.forEach(word => {
            const letters = [];
            word.split('').forEach(letter => {
                letters.push(<span className="letter" id={`letter${j}`}>{letter}</span>);
                j++
            });
            newWordsDivs.push(<div className="word" id={i}>{letters}</div>);
            newWordsDivs.push(<span className="space" id={`letter${j}`}>&nbsp;</span>)
            j++
            i++
        });
        newWordsDivs.pop()
        setWordDivs(newWordsDivs)
    }

    const validateLetter = (keyPressed, cursorPos) => {
        let letter = document.body.querySelector(`#letter${cursorPos}`)
        if (keyPressed === testWords[cursorPos]) {
            letter.classList.add("good-letter")
        } else {
            letter.classList.add("wrong-letter")
        }
    }

    const unvalidateLetter = (cursorPos) => {
        let letter = document.body.querySelector(`#letter${cursorPos-1}`)
        letter.classList.remove("good-letter")
        letter.classList.remove("wrong-letter")
    }


    const updateCursorPosition = (keyCode) => {
        if ((lowercaseLetters.includes(keyCode) || keyCode===" ") && currentPos !== testWords.length-1) {
            let letter = document.body.querySelector(`#letter${currentPos}`)
            letter.classList.remove("cursor")
            letter = document.body.querySelector(`#letter${currentPos+1}`)
            letter.classList.add("cursor")
            validateLetter(keyCode, currentPos)
            setCurrentPos(currentPos+1)
        } else if(keyCode === "Backspace" && currentPos !== 0) {
            let letter = document.body.querySelector(`#letter${currentPos}`)
            letter.classList.remove("cursor")
            letter = document.body.querySelector(`#letter${currentPos-1}`)
            letter.classList.add("cursor")
            unvalidateLetter(currentPos)
            setCurrentPos(currentPos-1)
        }
    }

    const calculateWPM = () => {
        const writingTime = (Date.now()-startTime)/1000
        const wpm = words.length*60/writingTime
        const wpmDiv = document.body.querySelector("#wpm")
        wpmDiv.innerHTML = `WPM: ${wpm}`
    }

    useEffect(() => {
        separateWords(words)
        setTestWords(words.join(" "))
    }, [words])

    useEffect(() => {
        if (!timerStarted && keyPressed) {
            setStartTime(Date.now())
            setTimerStarted(true)
        }
        if (0 <= currentPos && currentPos < testWords.length) {
            updateCursorPosition(keyPressed)
        }
        if (currentPos == testWords.length-1 && keyPressed !== "Backspace" && !timerEnded) {
            setTimerEnded(true)
            calculateWPM()
        }
    }, [keyPressed])

    return (
    <div className="text">
        {wordDivs}
    </div>)
}

export default TypingInput;