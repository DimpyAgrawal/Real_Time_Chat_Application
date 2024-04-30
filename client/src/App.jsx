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
import Drag from './components/Drag'
import Landing from './pages/Landing'
import Account from './pages/Account'
import Signup from './pages/Signup'
import Homee from './pages/Homee'
import Login from './pages/Login'
import PrivateRoute from './pages/PrivateRoute';
import { AuthProvider } from './pages/AuthContext'


export default function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          {/* <PrivateRoute  path='/acc' element={<Account />} /> */}
          <Route  path='/' element={<Landing />} />
          <Route  path='/homee' element={<Homee/>} />
          {/* <Route exact path='/signin' element={<SignIn />} /> */}
          {/* <Route exact path='/signup' element={<SignUp />} /> */}
          <Route  path='/dashboard' element={<Dashboard />} />
          <Route  path='/acc' element={<Account />} />
          {/* <PrivateRoute path="/home" element={<HomePage />} /> */}
          {/* <Route exact path='/heart' element={<Test />} /> */}
          <Route  path='/regist' element={<Signup />} />
          <Route  path='/login' element={<Login />} />
          
          
          <Route exact path='/chat2' element={<Chat2 />} />
          <Route exact path = '/drag' element ={<Drag/>}/>

        
        </Routes>
      </BrowserRouter>
      <ToastContainer />
      </AuthProvider>
    </>
  )
}
