import React, {useRef, useState} from 'react';
import './styles.css';

interface Message {
    id: number;
    username: string;
    message: string;
    event: string;
}

const WebSocketComp = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [value, setValue] = useState<string>('');
    const [connected, setConnected] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const socket = useRef<WebSocket | null>(null);

    const sendMessage = async () => {
        const message = {
            username,
            message: value,
            id: Date.now(),
            event: 'message'
        }
        if (socket.current) {
            socket.current.send(JSON.stringify(message));
            setValue('')
        }
    }


    const connect = () => {
        socket.current = new WebSocket('ws://localhost:5000');

        socket.current.onopen = () => {
            setConnected(true);
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            }
            socket.current?.send(JSON.stringify(message));
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages(prev => [message, ...prev])
        }
        socket.current.onclose = () => {
            console.log('Socket closed');
        }
        socket.current.onerror = () => {
            console.log('Socket error');
        }
    }

    if (!connected) {
        return (
            <div className="real-time-chat">
                <div className="real-time-chat__form">
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text"
                           placeholder="Write your name"/>
                    <button onClick={connect}>Connect</button>
                </div>
            </div>
        )
    }

    return (
        <div className="real-time-chat">
            <div>
                <h1>WebSocket</h1>
                <div className="real-time-chat__form">
                    <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
                    <button onClick={sendMessage}>Send</button>
                </div>
                <div className="real-time-chat__messages">
                    {messages.map(mess =>
                        <div key={mess.id}>
                            {mess.event === 'connection'
                                ? <div className="connection_message">
                                    User {mess.username} connected
                                </div>
                                : <div className="message">
                                    {mess.username}: {mess.message}
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default WebSocketComp;
