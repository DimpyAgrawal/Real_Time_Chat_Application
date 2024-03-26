import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Conversation({user}) {
    // const [user, setUser] = useState([]);

    // const userData = async () => {
    //     try {
    //         console.log('inside all users'); 
    //         const users = await axios.get("http://localhost:8080/allUsers"); 
    //         setUser(users.data);
    //         console.log(users);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const friendId = conversation.members.find((m) => m !== currentUser._id);

    // const getUser = async () => {
    //     try {
    //         const res = await axios.get("http://localhost:8080/user?userId=" + friendId);
    //         setUser(res.data); 
    //         console.log(res);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     userData();
    //     getUser();
    // }, [currentUser, conversation]);

    return (
        <div className='flex'>
            <div className='flex flex-col'>
               
                    <div className='flex mt-10' > 
                        <div><img className='h-16 w-28 rounded-full' src={user.pic ? user.pic : "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg"} alt="" /></div>
                        <div className='ml-7 w-full font-semibold m-auto'>{user.name ? user.name : "Ramesh"}</div> 
                    </div>
              
            </div>
        </div>
    );
}
