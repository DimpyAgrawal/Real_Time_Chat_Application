import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Conversation from './conversations/Conversation';
import Message from './message/Message';
import ChatOnline from './chatOnline/ChatOnline';
import axios from 'axios';
import io from 'socket.io-client'

export default function Chat2() {
    const socket = useRef();
    const [own, setOwn] = useState(true);
    const [user, setUser] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [conversationId, setConversationId] = useState("");

    const senderId = localStorage.getItem("id");


    const userData = async () => {
        try {
            console.log('inside userData route frontend');
            const users = await axios.get("http://localhost:8080/allUsers");
            setUser(users.data);
            // console.log(users.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getMessages = async () => {
        try {
            // console.log("Inside get messages");
            // console.log(conversationId);
            const res = await axios.get(`http://localhost:8080/message/${conversationId}`);
            // console.log(res.data);
            setMessages(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getConversationId = async () => {
        const chatId = currentChat && currentChat._id;
        try {
            console.log('Inside getConversationId frontend');
            console.log("Friend Id " + chatId);
            console.log("Sender Id " + senderId);

            const response = await axios.get(`http://localhost:8080/conversation/find/${chatId}/${senderId}`);
            console.log("ConversationId: " + response.data._id);
            setConversationId(response.data._id);

        } catch (error) {
            console.log(error);
        }
    }
    
    const handlesubmit = async (e) => {

        e.preventDefault();
        console.log('inside handle Submit...');
        const message = {
            sender: senderId,
            text: newMessage,
            conversationId: conversationId,
        };
        console.log({ senderId, recieverId: currentChat._id, text: newMessage, currentChat });
        currentChat && socket.current.emit("sendMessage", {
            senderId: senderId,
            recieverId: currentChat._id,
            text: newMessage,
        });

        try {
            console.log(message);

            const response = await axios.post('http://localhost:8080/message', message);
            console.log(response.data);
            setMessages([...messages, response.data]);
            setNewMessage("");

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        socket.current = io('ws://localhost:8080'); // for connection purpose 

        if (senderId) socket.current.emit("addUser", senderId);

        socket.current.on('getMessage', data => {
            try {
                console.log("data", data);
                setArrivalMessage({
                    ...data,
                    createdAt: Date.now()
                })
            } catch (error) {
                console.error("Error handling getMessage:", error);
            }
        });
    }, [])

    // useEffect(() => {
    //     socket.current.on('getMessage', data => {
    //       try {
    //         console.log("data", data);
    //         setArrivalMessage({
    //           ...data,
    //           createdAt: Date.now()
    //         })
    //       } catch (error) {
    //         console.error("Error handling getMessage:", error);
    //       }
    //     });
    //   }, []);

    useEffect(() => {

        console.log(arrivalMessage, currentChat, currentChat && arrivalMessage && currentChat._id === arrivalMessage.senderId);
        arrivalMessage &&
            currentChat &&
            currentChat._id === arrivalMessage.senderId &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        userData();
        getConversationId();
        currentChat && getMessages();

    }, [currentChat], [messages]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handlesubmit(e)
        }
    }

    
    return (
        <div className='w-[100vw] h-[89vh] flex' >
            <div className='flex pt-2 pb-2   w-[100vw] h-[5vh]'>

                <div className='cursor-pointer ml-4 w-[20%] '>
                    <input className='p-1 w-full rounded-md border-b-2 border-gray-400' type="search" placeholder='Search for friends' />
                    {user && user.map((c) => (
                        (senderId != c._id) && <div key={c._id} onClick={() => setCurrentChat(c)}>
                            <Conversation user={c} />
                        </div>
                    ))}
                </div>

                <div className='cursor-pointer'>
                    {currentChat ?
                        <div className='w-[90%]   h-[80dvh] overflow-y-auto'>
                            {messages && messages.map((m, idx) => (
                                // <div ref={useRef}>
                                <div key={idx}>

                                    <Message messages={m} own={m.sender === senderId} />
                                </div>
                                //</div>
                            ))}

                        </div>
                        : <>Open a conversation to start a chat</>}
                    <div className='  flex w-[90%]'>
                        <textarea
                            name='newMessage'
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyPress}
                            className='border-2 w-[80%] h-[20vh] p-4 rounded-md border-gray-400' placeholder='Write something...'></textarea>
                        <button className=' ml-4 bg-green-600 text-white p-3 pl-2 pr-2 w-[100px] rounded-md  m-auto h-[50px]' onClick={handlesubmit}>send</button>
                    </div>
                </div>
                <div className='cursor-pointer w-[30%]'>
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                </div>
            </div>


        </div>
    )
}
