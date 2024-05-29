import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TypingInput from '../components/TypingInput';
import Keyboard from '../components/Keyboard';
import Modal from '../components/Modal';

function MultiPlayerPage() {

    const [gameWords, setGameWords] = useState(null);
    const accessToken = Cookies.get("access_token");
    const decode = jwtDecode(accessToken);
    const userName = decode.sub;
    const [opponent, setOpponent] = useState(null);
    const location = useLocation();
    const [endGameHandler, setEndGameHandler] = useState(() => () => {});
    const [updateProgress, setUpdateProgress] = useState(() => () => {});
    const [surrenderHandler, setSurrenderHandler] = useState(() => () => {});
    const [playAgainHandler, setPlayAgainHandler] = useState(() => () => {});
    const [endForTodayHandler, setEndForTodayHandler] = useState(() => () => {});

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const socket = new SockJS(`http://${process.env.REACT_APP_SERVER_BASE_URL}/ws`);
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                connectingToLobby();
                stompClient.subscribe(`/user/${userName}/queue/match`, (message) => {
                    alert(`Match against ${message.body}`);
                    setOpponent(message.body);
                    getWords();
                });
                stompClient.subscribe(`/user/${userName}/queue/disconnect`, (message) => {
                    alert(`User ${message.body} disconnected. You won!`);
                    setShowModal(true);
                });
                stompClient.subscribe(`/user/${userName}/queue/match/words`, (message) => {
                    setGameWords(JSON.parse(message.body));
                });
                stompClient.subscribe(`/user/${userName}/queue/match/end`, (message) => {
                    alert('You lost!');
                    setShowModal(true);
                });
                stompClient.subscribe(`/user/${userName}/queue/match/update`, (message) => {
                    console.log(message.body);
                    document.body.querySelector('.progress-bar').style.setProperty('--progress-height', message.body + '%');
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });

        const handlePlayAgain = () => {
            setShowModal(false);
            setOpponent(null);
            setGameWords(null);
            connectingToLobby()
          };

          setPlayAgainHandler(() => handlePlayAgain);
        
        const handleEndForToday = () => {
            setOpponent(null);
            setGameWords(null);
            setShowModal(false);
          };

        setEndForTodayHandler(() => handleEndForToday);

        const disconnectingFromLobby = () => {
            stompClient.publish({
                destination: '/app/disconnect',
                body: accessToken
            });
        };

        const getWords = () => {
            stompClient.publish({
                destination: '/app/get-game-words',
                body: accessToken
            });
        };

        const connectingToLobby = () => {
            stompClient.publish({
                destination: '/app/join',
                body: accessToken
            });
        };

        const handleEndGame = () => {
            stompClient.publish({
                destination: '/app/game-end',
                body: accessToken
            });
            alert('You won!');
            setShowModal(true);
        };

        setEndGameHandler(() => handleEndGame);

        const handleUpdateProgress = (progress) => {
            stompClient.publish({
                destination: '/app/update',
                body: JSON.stringify({ accessToken: accessToken, progress: progress })
            });
        };

        setUpdateProgress(() => handleUpdateProgress);

        const surrender = () => {
            disconnectingFromLobby();
            alert('You lost!')
            setShowModal(true);
        }

        setSurrenderHandler(() => surrender);

        window.addEventListener('beforeunload', disconnectingFromLobby);
        stompClient.activate();

        return () => {
            window.removeEventListener('beforeunload', disconnectingFromLobby);
            stompClient.publish({
                destination: '/app/disconnect',
                body: accessToken
            });
            stompClient.deactivate();
        };
    }, [accessToken, userName, location]);

    return (
        <>
            {opponent && gameWords ? 
                <div className="page-wrapper">
                    <div className="stats-container side-container">
                        <div id="wpm-label">WPM</div>
                        <span id="wpm"></span>
                        <div id="wpm-label">Accuracy</div>
                        <span id="accuracy"></span>
                    </div>
                    <div className='container'>
                        <div className="text-container">
                            <TypingInput words={gameWords} isMultiplayer={true} onGameEnd={endGameHandler} updateProgress={updateProgress}></TypingInput>
                        </div>
                        <Keyboard></Keyboard>
                        <button onClick={surrenderHandler} className="mt-custom mb-2 bg-red-600 text-white py-3 px-6 rounded hover:bg-red-800">
                        END
                        </button>
                        <Modal 
                            show={showModal}
                            handlePlayAgain={playAgainHandler}
                            handleEndForToday={endForTodayHandler}
                        />
                    </div>
                    <div className="hero-container side-container">
                        <span id='progress-label'>Opponent's progress</span>
                        <div className='progress-container'>
                            <div className='progress-bar' />
                        </div>
                    </div>
                </div>
            : 
                <div className='lobby-container'>
                    <div className='lobby-message'>
                        <span>Waiting for opponent...</span>
                    </div>
                </div>
            }
        </>
    );
}

export default MultiPlayerPage;