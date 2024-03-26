import React from 'react'


export default function Message({messages,own}) {
  return (
    <div>
      <div className='flex flex-col  '>
        {own?
         <div className='ml-[32%] w-full mt-[5%] ' >
         <div className='flex  '>
         <div className='w-[5%]'><img className='rounded-full' src=" https://i.pinimg.com/originals/1d/96/90/1d9690843be5cda879f466d1441cb950.jpg" alt="" /></div>
         <div className=' ml-3 bg-gray-400  rounded-xl w-[60%] '> {messages.text} </div>

         </div>
         <div className='ml-[57%]'>
        
           {messages.createdAt}</div>
     </div>
        :
        <div className='ml-[5%] mt-[5%]' >
            <div className='flex  '>
            <div className='w-[5%]'><img className='rounded-full' src=" https://i.pinimg.com/originals/1d/96/90/1d9690843be5cda879f466d1441cb950.jpg" alt="" /></div>
            <div className=' ml-3 bg-blue-700  rounded-xl w-[60%] text-white '> {messages.text}</div>

            </div>
            <div>{messages.createdAt}</div>
        </div>
        
        }


         
      </div>
     
    </div>
  )
}
