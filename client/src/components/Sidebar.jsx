import { useState, useEffect, useRef } from "react";
import ChatSide from "./ChatSide";
// import { IoIosVideocam } from "react-icons/io";

// import { MdPersonAddAlt1 } from "react-icons/md";
// import { MdPersonSearch } from "react-icons/md";
// import { HiMiniUserGroup } from "react-icons/hi2";
import Suggestion from "./SideCompo/Suggestion";
import Video from "./SideCompo/Video";
import GroupChat from "./SideCompo/GroupChat";
import Request from "./SideCompo/Request";

const Sidebar = () => {
    const profileRef = useRef()
    const [isProfileActive, setIsProfileActive]=useState(false)
    const [data,setdata]=useState(0);
    const navigation=[
       
        {
            href: 'javascript:void(0)',
            name: 'Chats',
            icon: <button onClick={()=>{setdata(0)}}><svg xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 640 512"><path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2 0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.3-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9l0 0 0 0-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z"/></svg></button>
        },
        
        // {
        //     href: 'javascript:void(0)',
        //     name:'Group chat',
        //     icon:<button onClick={()=>{setdata(1)}}><HiMiniUserGroup className="text-black text-xl"/></button>
        // ,
        // },
        // {
        //     href: 'javascript:void(0)',
        //     name:'Video Calling',
        //     icon:<button onClick={()=>{setdata(2)}}><IoIosVideocam className="text-black text-xl"/></button>
        // ,
        // },
        // {
        //     href: 'javascript:void(0)',
        //     name:'Friend Request',
        //     icon:<button onClick={()=>{setdata(3)}}><MdPersonAddAlt1 className="text-black text-xl"/></button>
        // ,
        // },
        // {
        //     href: 'javascript:void(0)',
        //     name:'Suggestions',
        //     icon:<button onClick={()=>{setdata(4)}}><MdPersonSearch className="text-black text-xl"/></button>
        // ,
        // }
    ]

    const navsFooter = [
        {
            href: 'javascript:void(0)',
            name: 'Settings',
            icon:<button onClick={()=>{setdata(5)}}><svg xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg></button>
            ,
        },
        {
            href: 'javascript:void(0)',
            name: 'Logout',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            ,
        }
    ]

    useEffect(() => {
        const handleProfile = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) setIsProfileActive(false)
        }
        document.addEventListener('click', handleProfile)
    }, [])

    return (
        <div>
        {data==0?<ChatSide></ChatSide>:null}
        {data==1?<GroupChat></GroupChat>:null}
        {data==2?<Video></Video>:null}
        {data==3?<Request></Request>:null}
        {data==4?<Suggestion></Suggestion>:null}

            <nav
                className="fixed  left-0 w-20 h-full border-r-2 border-slate-500 bg-slate-300 space-y-8">
                <div class="flex flex-col h-full">
                    <div className='h-10 flex items-center justify-center px-8'>
                        <a href='javascript:void(0)' className='flex-none'>
                        </a>
                    </div>
                    <div className="flex-1 flex flex-col h-full">
                        <ul className="px-4 text-sm font-medium flex-1">
                            {
                                navigation.map((item, idx) => (
                                    <li key={idx}>
                                        <a href={item.href} className="relative flex items-center justify-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150 group">
                                            <div className="text-gray-500">{item.icon}</div>
                                            <span className="absolute left-14 p-1 px-1.5 rounded-md whitespace-nowrap text-xs text-white bg-gray-800 hidden group-hover:inline-block group-focus:hidden duration-150">
                                                {item.name}
                                            </span>
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                        <div>
                            <ul className="px-4 pb-4 text-sm font-medium">
                                {
                                    navsFooter.map((item, idx) => (
                                        <li key={idx}>
                                            <a href={item.href} className="relative flex items-center justify-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150 group">
                                                <div className="text-gray-500">{item.icon}</div>
                                                <span className="absolute left-14 p-1 px-1.5 rounded-md whitespace-nowrap text-xs text-white bg-gray-800 hidden group-hover:inline-block group-focus:hidden duration-150">
                                                    {item.name}
                                                </span>
                                            </a>
                                        </li>
                                    ))
                                }
                            </ul>
                            <div className="relative py-4 px-4 border-t">
                                <button ref={profileRef} className="w-12 h-12 flex items-center gap-x-4 cursor-pointer rounded-full ring-offset-2 ring-gray-800 focus:ring-2 duration-150"
                                    onClick={() => setIsProfileActive(!isProfileActive)}
                                >
                                    <img src="https://randomuser.me/api/portraits/women/79.jpg" className="w-12 h-12 rounded-full" />
                                </button>
                                {
                                    isProfileActive ? (
                                        <div className="absolute bottom-4 left-20 w-64 rounded-lg bg-white shadow-md border text-sm text-gray-600">
                                            <div className="p-2">
                                                <span className="block text-gray-500/80 p-2">vienna@gmail.com</span>
                                                <a href="javascript:void(0)" className="block w-full p-2 text-left rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150">
                                                    Status
                                                </a>
                                                <div className="relative rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 absolute right-1 inset-y-0 my-auto pointer-events-none">
                                                        <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                                                    </svg>
                                                    <select className="w-full cursor-pointer appearance-none bg-transparent p-2 outline-none">
                                                        <option disabled selected>Theme</option>
                                                        <option>Dark</option>
                                                        <option>Light</option>
                                                    </select>
                                                </div>
                                                <button className="block w-full p-2 text-left rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150">
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    ) : ""
                                }
                            </div>
                        </div>
                    </div >
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;