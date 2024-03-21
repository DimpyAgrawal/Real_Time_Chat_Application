import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Conversation from './conversations/Conversation';
import Message from './message/Message';
import ChatOnline from './chatOnline/ChatOnline';
import axios from 'axios';

export default function Chat2() {
    const navigate = useNavigate();
    const [own, setOwn] = useState(true);
    const [conversation, setConversation] = useState([]); // Define state for conversation
    const [user, setUser] = useState([]); 
    const [currentChat,setCurrentChat] = useState(null);
    const [messages,setMessages] = useState([]);
    const [newMessage,setNewMessage] = useState("");
    const scrollRef = useRef(); // used for create scroll effect for the middle part
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
    const getConversation = async () => {
        try {
            if (user && user._id) { // Check if user is not null and has _id
                const res = await axios.get("/conversation/" + user._id);
                setConversation(res.data);
                console.log(res);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getMessages = async()=>{
        const chatId = currentChat._id;
        console.log('inside get message route');
        console.log(chatId);
        try{
            console.log('inside getMessages frontend');
            const response =  await axios.get(`http://localhost:8080/message/${chatId}`);
            setMessages(response.data);
            // console.log(response.data);

        }catch(error){
            console.log(error);
        }
    }
    console.log(messages);
    useEffect(() => {
        userData();
        getMessages();
        // getConversation();
        // scrollRef.current?.scrollIntoView({behavior:"smooth"}); // to show scorll on the chat


    }, [currentChat],[messages]);

    const handlesubmit= async(e)=>{

        e.preventDefault();
        console.log('inside handlesubmit');
        console.log(user._id);  
    
    console.log(senderId);

        console.log(currentChat._id);
        const message = {
            sender: senderId,
            text:newMessage,
            conversationId: currentChat._id
        };
        try{
            console.log(message);
            const response = await axios.post('http://localhost:8080/message',message);
            console.log(response.data);
            setMessages([...messages,response.data]);
            setNewMessage("");

        }catch(error){
            console.log(error);
        }

    }
    const handleKeyPress =(e)=>{
        if(e.key=== 'Enter' && !e.shiftKey){
            handlesubmit(e)
        }
    }
    return (
        <div className='w-[100vw] h-[89vh] flex' >
            <div className='flex pt-2 pb-2   w-[100vw] h-[5vh]'>

                <div className='cursor-pointer ml-4 w-[20%] '>
                    <input className='p-1 w-full rounded-md border-b-2 border-gray-400' type="search" placeholder='Search for friends' />
                    {user && user.map((c) => (
                        <div key={c._id} onClick={()=>setCurrentChat(c)}>
                            {/* {console.log(currentChat)} 
                            {console.log(c.name)} */}
                            {/* {console.log(c._id)} */}
                            
                            <Conversation user={c} />
                       </div>
                    ))}

                    {/* <Conversation /> */}
                </div>

                <div className='cursor-pointer'>
                    {currentChat?

                    <div className='w-[90%] '>
                        {/* {console.log(user._id)} */}
                    {messages && messages.map((m)=>(
                        // <div ref={useRef}>
                           
                            <Message messages={m} own={m.sender === senderId} />
                        // </div>
                    ))}
                       
                    </div>
                    :<>Open a conversation to start a chat</>} 
                    <div className='  flex w-[90%]'>
                        <textarea  
                        name='newMessage' 
                        value={newMessage} 
                        onChange={(e)=>setNewMessage(e.target.value)}  
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
