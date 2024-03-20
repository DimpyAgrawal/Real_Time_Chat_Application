// import { createContext, useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';

// const ChatContext = createContext();

// const ChatProvider = ({ children }) => {
//     const [user, setUser] = useState(null); // Initialize user state with null
//     const navigate = useNavigate();

//     useEffect(() => {
//         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//         setUser(userInfo);
//         if (!userInfo) {
//             navigate("/chats");
//         }
//     }, [navigate]);

//     return (
//         <ChatContext.Provider value={{ user, setUser }}>
//             {children}
//         </ChatContext.Provider>
//     );
// }

// export default ChatProvider;
