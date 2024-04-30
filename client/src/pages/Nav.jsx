import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Authmodal from './Authmodal';
import logo from '../assets/logo1.png'



function Nav({setmatch}) {
    const [showmodal,setshowmodal]=useState(false);
    const[sign,setsign]=useState(false);
    // const [match,setmatch]=useState(false);
    const handleclick=()=>{
        setshowmodal(true)
        setsign(false)
    }
    const handleclick2=()=>{
        setshowmodal(true)
        // setsign(true)
    }
  return (
    <div className="flex justify-between text-black p-2 ml-4 items-center">
      <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <img src={logo} alt="Logo" className='h-9' />
      <span className={`ml-3 text-2xl ${setmatch?'text-white':'text-black'}`}>Matchify</span>
    </a>
    <div className=" m-2 text-lg">
        <button className=" bg-white rounded px-2 py-1" onClick={handleclick}>Login</button>
        {showmodal &&(<Authmodal setshowmodal={setshowmodal} setsign={setsign}/>)}
    </div>
    </div>
  )
}

export default Nav
