import React, { useState } from 'react'
import ProfilePage from './ProfilePage'
import { Link, useNavigate } from 'react-router-dom'
import SignIn from './SignIn'
import SideDrawer from './SideDrawer'
import MyChats from './MyChats'
import ChatBox from './ChatBox'
import Sidebar from './Sidebar'
import ChatPage from './ChatPage'
import GroupChatModel from './GroupChatModel'



export default function Dashboard() {
    const [selectedOption, setSelectedOption] = useState(""); // State to track selected option
    const [showProfile, setShowProfile] = useState(false); // State to control rendering of ProfilePage
    const [sidebar,setSideBar] = useState(false);
    const [groupChat , setGroupChat] = useState(false);
    const navigate = useNavigate();

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);

        // Check if "My Profile" option is selected
        if (value === "volvo") {
            setShowProfile(true);
            // navigate('/ProfilePage')

        } 
        else {
            setShowProfile(false);
        }
        if(value=="saab"){
            localStorage.clear();
            navigate('/SignIn');
            
        }
    };

    const handleSideBar = ()=>{
        setSideBar(true);
    };
    const handleGroupChat = ()=>{
        setGroupChat(true);
    }
    return (
        <div className='w-[98vw] h-[89vh] flex flex-col'>
            <div className='flex w-[100vw] justify-between'>
                <div className='flex'>
                <form className="max-w-md mx-auto">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input
                    onFocus={handleSideBar}
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                    required
                />
                {sidebar && <Sidebar />}
            </div>
        </form>
                    


                    
                    {/* <div className='mr-4'>

                    <SideDrawer />
                    </div>
                    <div className='mr-4'>

                    <MyChats />
                    </div>
                    <div >

                    <ChatBox />
                    </div> */}
                    {/* <div><Sidebar/> </div> */}

                    <div>
                        <button onClick={handleGroupChat}>GroupChat</button>
                        {groupChat && <GroupChatModel setGroupChat = {setGroupChat} />}
                    </div>

                </div>
                <div>Talk-A-Tive</div>
                
                <div className='flex'>
                    <span class="material-symbols-outlined mr-4 mt-2">notifications</span>
                    <div className='flex boder-2 h-10  border-black p-2 rounded-md w-[75px] bg-gray-300'  >

                        <div class="flex relative ml-1 w-6 h-6 overflow-hidden  bg-gray-100 rounded-full dark:bg-gray-600">

                            <svg class="absolute  w-8 h-6 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                        </div>
                        <div>
                            <select className="cars bg-gray-300 ml-1 w-5" id="cars" onChange={handleSelectChange}>
                                <option value=""></option>
                                <option value="volvo">My Profile</option>
                                <option value="saab">Logout</option>
                            </select>
                         
                            {showProfile && <ProfilePage setShowProfile={setShowProfile}  />} 
                        </div>

                    </div>
                </div>
            </div>
            <div>
            <ChatPage/>
            </div>
        </div>
    )
}
