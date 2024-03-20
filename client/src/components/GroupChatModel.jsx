import React, { useState } from 'react'

export default function GroupChatModel({setGroupChat}) {
    const [groupChatName,setGroupChatName] = useState();
    const [selectedUsers,setSelectedUsers] = useState([]);
  return (
    <div className='flex w-[100vw] h-[100vh] bg-gray-100  bg-opacity-70 fixed left-0 top-0'>
        <div className='flex flex-col m-auto bg-white shadow-2xl  rounded-md p-4 w-[30vw]'>
        <div ><span class="material-symbols-outlined ml-[95%] cursor-pointer" onClick={()=>setGroupChat(false)}>close</span></div>
        <div><h1 className='flex font-semibold text-3xl justify-center m-auto'>Create Group Chat</h1></div>
        <div className='text-2xl mt-6'>
            <input className='border-2 w-full border-gray-200 rounded-md p-2' type="text" placeholder='Chat Name' />
            <input className='border-2 mt-3 w-full border-gray-200 rounded-md p-2' type="text" placeholder='Add Users eg. John,Piyush' />

        </div>
        

            <button className='flex justify-end mt-3 ml-[75%] rounded-md shadow-lg text-white pl-3 bg-blue-500 w-[25%] p-2'>Create Chat</button>
        
       


        </div>
      
    </div>
  )
  
}
