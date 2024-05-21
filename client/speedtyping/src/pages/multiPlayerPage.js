import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';

function MultiPlayerPage() {

    const accessToken = Cookies.get("access_token");
    const decode = jwtDecode(accessToken);
    const userName = decode.sub;
    const [opponent, setOpponent] = useState(null);

    useEffect(() => {
        const socket = new SockJS(`http://${process.env.REACT_APP_SERVER_BASE_URL}/ws`);
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log('Connected to WebSocket');
                stompClient.publish({
                    destination: '/app/join',
                    body: accessToken
                });
                stompClient.subscribe(`/user/${userName}/queue/match`, (message) => {
                    alert(`Match against ${message.body}`);
                    setOpponent(message.body);
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            }
        });

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, [accessToken, userName]);

    return (
        <div className='bg-white'>
             {opponent ? `Match against ${opponent}` : 'Waiting for opponent...'}
        </div>
    );
}

export default MultiPlayerPage;
