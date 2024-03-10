import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Home from './components/Home'
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify'

export default function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/signin' element={<SignIn />} />
          <Route exact path='/signup' element={<SignUp />} />

        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}
