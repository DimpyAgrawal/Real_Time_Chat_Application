import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import ChatProvider from '../context/ChatProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // to access the all states in all over the wrap
  // <ChatProvider>  
  //       <App />
  // </ChatProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
