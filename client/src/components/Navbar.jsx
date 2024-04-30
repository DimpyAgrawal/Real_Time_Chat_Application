import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/logo1.png'

function Nav_bar() {
    const navigate = useNavigate()
  const [openOptionMobile, setOpenOptionMobile] = useState(false);
  const isLogin = localStorage.getItem('loggedin');
  useEffect(() => {
    console.log(isLogin);
  }, [isLogin]);

  return (
    <div>
      {/* <header class="text-gray-600 body-font"> */}
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <img src={logo} alt="Logo" className='h-9' />
      <span class="ml-3 text-xl">Chaty-Fy</span>
    </a>
    <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
      {isLogin ? (
            <>
            <div className='mr-5 hover:text-gray-90 cursor-pointer'><NavLink to='/'>Home</NavLink></div> 
            <div className='mr-5 hover:text-gray-90 cursor-pointer'><NavLink to='/chat2'>Chat</NavLink></div> 
            <div className='mr-5 hover:text-gray-90 cursor-pointer'><NavLink to='/dashboard'>DashBoard</NavLink></div> 

            <div className='mr-5 hover:text-gray-90 cursor-pointer' onClick={() => { localStorage.clear(); navigate('/signin'); }}>Logout</div>
            </>
          ) : (
            <>
            <div className='mr-5 hover:text-gray-90 cursor-pointer'><NavLink to='/signin'>LogIn</NavLink></div> 
            <div className='mr-5 hover:text-gray-90 cursor-pointer'><NavLink to='/signup'>SignUp</NavLink></div>
            </>
          )}
    </nav>

  </div>
{/* </header> */}
    </div>
  )
}

export default Nav_bar
