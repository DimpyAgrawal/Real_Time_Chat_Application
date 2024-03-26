import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Conversation from './conversations/Conversation';
import Message from './message/Message';
import ChatOnline from './chatOnline/ChatOnline';
import axios from 'axios';
import io from 'socket.io-client';

export default function Chat2() {
    const socket = useRef();
    const scroller = useRef()
    const [user, setUser] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [conversationId, setConversationId] = useState("");
    const senderId = localStorage.getItem("id");

    useEffect(() => {
        socket.current = io('ws://localhost:8080');
    
        if (senderId) socket.current.emit("addUser", senderId);
        socket.current.on('getMessage', data => {
            try {
                console.log(data);
                setArrivalMessage({
                    ...data,
                    createdAt: Date.now()
                });
            } catch (error) {
                console.error("Error handling getMessage:", error);
            }
        });
    }, []);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await axios.get("http://localhost:8080/allUsers");
                setUser(users.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (currentChat) {
            const fetchConversationId = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/conversation/find/${currentChat._id}/${senderId}`);
                    setConversationId(response.data._id);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchConversationId();
        }
    }, [currentChat, senderId]);

    useEffect(() => {
        if (conversationId) {
            const fetchMessages = async () => {
                try {
                    const res = await axios.get(`http://localhost:8080/message/${conversationId}`);
                    setMessages(res.data);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchMessages();
        }
    }, [conversationId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const message = {
            sender: senderId,
            text: newMessage,
            conversationId: conversationId,
        };

        if (currentChat) {
            socket.current.emit("sendMessage", {
                senderId: senderId,
                recieverId: currentChat._id,
                text: newMessage,
            });
        }

        try {
            const response = await axios.post('http://localhost:8080/message', message);
            setMessages([...messages, response.data]);
            setNewMessage("");
        } catch (error) {
            console.log(error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSubmit(e);
        }
    };
    useEffect(() => {

        console.log(arrivalMessage, 
            currentChat, currentChat
             && arrivalMessage && 
             currentChat._id === arrivalMessage.senderId);
        arrivalMessage &&
            currentChat &&
            currentChat._id === arrivalMessage.senderId &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        console.log(messages);
        scroller.current?.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);

    const handleChatSelection = (selectedUser) => {
        setCurrentChat(selectedUser);
        setMessages([]); // Clear previous messages
    };

    return (
        <div className='w-[100vw] h-[89vh] flex'>
            <div className='flex pt-2 pb-2 w-[100vw] h-[5vh]'>
                <div className='cursor-pointer ml-4 w-[20%] '>
                    <input className='p-1 w-full rounded-md border-b-2 border-gray-400' type="search" placeholder='Search for friends' />
                    {user && user.map((c) => (
                        (senderId !== c._id) && (
                            <div key={c._id} onClick={() => handleChatSelection(c)}>
                                <Conversation user={c} />
                            </div>
                        )
                    ))}
                </div>

                <div className='cursor-pointer'>
                    {currentChat ? (
                        <div className='w-[90%] h-[80dvh] overflow-y-auto'>
                            {messages && messages.map((m, idx) => (
                                <div key={idx} ref={scroller}>
                                    <Message messages={m} own={m.sender === senderId} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Open a conversation to start a chat</p>
                    )}
                    <div className='flex w-[90%]'>
                        <textarea
                            name='newMessage'
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyPress}
                            className='border-2 w-[80%] h-[20vh] p-4 rounded-md border-gray-400'
                            placeholder='Write something...'
                        ></textarea>
                        <button className='ml-4 bg-green-600 text-white p-3 pl-2 pr-2 w-[100px] rounded-md m-auto h-[50px]' onClick={handleSubmit}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
