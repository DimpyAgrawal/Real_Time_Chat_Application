import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Landing_page() {
  return (
    <div>
   <div className='flex flex-col h-screen justify-center items-center'>
     <button type="button" className="px-8 py-3 font-semibold rounded-full dark:bg-gray-100 dark:text-gray-800"><NavLink to='/signin'>LogIn</NavLink></button>
     <button type="button" className="px-8 py-3 font-semibold rounded-full dark:bg-gray-100 dark:text-gray-800"><NavLink to='/signup'>SignUp</NavLink></button>
</div>
</div>
  )
}

export default Landing_page

