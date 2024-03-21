import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Home from './components/Home'
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard'
import ProfilePage from './components/ProfilePage'
import { ToastContainer } from 'react-toastify'
import Landing_page from './components/Landing_page'
import Chat2 from './components/Chat2'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route exact path='/' element={<Landing_page />} />
          <Route exact path='/home' element={<Home/>} />
          <Route exact path='/signin' element={<SignIn />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/dashboard' element={<Dashboard />} />
          
          <Route exact path='/chat2' element={<Chat2 />} />


          {/* <Route exact path='/profilepage' element={<ProfilePage />} /> */}

        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}
