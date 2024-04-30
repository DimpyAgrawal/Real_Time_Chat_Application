import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Conversation from './conversations/Conversation';
import Message from './message/Message';
import ChatOnline from './chatOnline/ChatOnline';
import axios from 'axios';
import io from 'socket.io-client';
import '../App.css'

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
        setMessages([]); 
    };

    return (
        <div className='w-[100%] h-[90%] flex bg-green-300'>
           
            <div className='flex pt-2 w-[100%] h-[90%] m-auto justify-between p-10  border-2 bg-slate-950'>
                <div className='cursor-pointer ml-4 flex flex-col h-[88vh]  w-full sm:w-[25%]  rounded-md bg-slate-500  '>
                    <input className='p-1 pl-10 w-full rounded-md border-b-2 border-gray-400' type="search" placeholder='Search for friends' />
                    <div className='flex flex-col ml-6'>

                        {user && user.map((c) => (
                            (senderId !== c._id) && (
                                <div key={c._id} onClick={() => handleChatSelection(c)}>
                                    <Conversation user={c} />
                                </div>
                            )
                        ))}
                    </div>
                </div>
                <div className=' flex bg-slate-600 h-[88vh] w-[65%]  '>
                    <div className='cursor-pointer m-auto w-[80%] h-[88vh]'>
                        {currentChat ? (<>
                            <div className='custom-scrollbar h-[80vh]  w-[100%] overflow-y-auto '>
                                {messages && messages.map((m, idx) => (
                                    <div className=' w-full flex flex-col gap-y-2 custom-scrollbar' key={idx} ref={scroller}>
                                        <Message messages={m} own={m.sender === senderId} />
                                    </div>
                                ))}
                            </div>
                        <div className='flex  '>
                            <textarea
                                name='newMessage'
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className='border-2 w-[90%] resize-none h-[8vh] p-3 rounded-md border-gray-400'
                                placeholder='Your message here ...'
                            ></textarea>
                            <button className=' bg-green-600 ml-2 text-white p-3 h-[8vh] pl-2 pr-2 w-[100px] rounded-md m-auto' onClick={handleSubmit}>Send</button>
                        </div>
                        </>
                        ) : (
                            <p className=' flex m-auto mt-[40%] justify-center text-2xl '>Open a conversation to start a chat</p>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}
