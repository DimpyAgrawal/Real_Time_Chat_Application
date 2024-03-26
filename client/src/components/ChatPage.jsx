import React, { useState } from 'react'
// import { ChatState } from '../../context/ChatProvider'
// import SideDrawer from './SideDrawer';
// import MyChats from './MyChats';
// import ChatBox from './ChatBox';


export default function ChatPage() {
    // const{ user } = ChatState();
  return (
    <div className='flex w-[80vw] ml-[35%] h-[80vh] bg-blue-100ue'>
      <div className='flex flex-col bg-slate-400 p-5 w-[70vw] h-[70vh'>
    chats
    <input  className='mt-[43%] w-[95%] p-4 rounded-md' type="text" placeholder='write your chat here...' />
      </div>
    
      
        {/* {user && <SideDrawer/>}
       {user && <MyChats/>}
        {user && <ChatBox/>} */}
      
    </div>
  )
}
