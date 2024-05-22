import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function MultiPlayerPage() {

    const accessToken = Cookies.get("access_token");
    const decode = jwtDecode(accessToken);
    const userName = decode.sub;
    const [opponent, setOpponent] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const socket = new SockJS(`http://${process.env.REACT_APP_SERVER_BASE_URL}/ws`);
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log('Connected to WebSocket');
                connectingToLobby();
                stompClient.subscribe(`/user/${userName}/queue/match`, (message) => {
                    alert(`Match against ${message.body}`);
                    setOpponent(message.body);
                });
                stompClient.subscribe(`/user/${userName}/queue/disconnect`, (message) => {
                    alert(`User ${message.body} disconnected`);
                    setOpponent(null);
                    connectingToLobby();
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });
        const disconnectingFromLobby = () => {
            stompClient.publish({
                destination: '/app/disconnect',
                body: accessToken
            });
        }

        const connectingToLobby = () => {
            stompClient.publish({
                destination: '/app/join',
                body: accessToken
            });
        }


        window.addEventListener('beforeunload', disconnectingFromLobby);
        stompClient.activate();

        return () => {
            window.removeEventListener('beforeunload', disconnectingFromLobby);
            stompClient.publish({
                destination: '/app/disconnect',
                body: accessToken
            })
            stompClient.deactivate();
        };
    }, [accessToken, userName, location]);

    return (
        <div className='bg-white'>
             {opponent ? `Match against ${opponent}` : 'Waiting for opponent...'}
        </div>
    );
}

export default MultiPlayerPage;
