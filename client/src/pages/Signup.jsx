import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useCookies } from 'react-cookie'

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_pass, setconf] = useState('');
  const [error, setError] = useState('');
  const [ cookies, setCookie, removeCookie] = useCookies(null)
  const navigate=useNavigate();
  
  
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // console.log("hiiiii")
    try {
      const response = await axios.post('http://localhost:8080/register',{
        email,
        password,
        confirm_pass
      });
      
      setCookie('AuthToken', response.data.token)
      setCookie('UserId', response.data.userId)

      const notify1=()=>toast.error(response.data.error);
      console.log('Signup successful:', response.data);
      console.log(response.data)
      if(response.data.error){notify1()}
      else navigate('/acc')
    } catch (error) {
      setError('Failed to sign up. Please try again.');
      console.error('Signup failed:', error);
    }
  };
  return (
    <div className=''>
      <form action="/register"method="POST"  >
        <h1 className="text-3xl pt-4 font-semibold text-center text-gray-600 ">Signup</h1>
        <div className="p-2 text-center">
        <div className="py-1 my-2">
        <input className="px-2 py-1 w-60 border-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div className="py-1 mt-2">
        <input className="px-2 py-1 w-60 border-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <div className="py-1 mt-2">
        <input className="px-2 py-1 w-60 border-2" type="password" placeholder="Confirm Password" value={confirm_pass} onChange={(e) => setconf(e.target.value)} required/>
        </div>
        <button onClick={handleSubmit} className="rounded-lg bg-purple-800 px-2 py-1 mt-4 w-60 border-2 mb-3 text-white hover:bg-slate-300">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Signup
