import React from 'react'

export default function ProfilePage({setShowProfile}) {
  return (
    <div className='flex w-[100vw] h-[100vh] bg-gray-100  bg-opacity-70 fixed left-0 top-0'>
        <div className='flex flex-col m-auto bg-white shadow-2xl  rounded-md p-4 w-[30vw]'>
        <div ><span class="material-symbols-outlined ml-[95%] cursor-pointer" onClick={()=>setShowProfile(false)}>close</span></div>
        <div><h1 className='flex font-semibold text-4xl justify-center m-auto'>Dimpy Agrawal</h1></div>
        <div><img className=' flex h-[15vh] m-auto rounded-lg mt-[5%]' src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw" alt="" /></div>
        <div className='text-2xl'>
            <div>Email:</div>
            <div>dimpyagrawal@gmail.com</div>

        </div>


        </div>
      
    </div>
  )
}
