import { createContext, useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';

const  ChatContext = createContext();

const ChatProvider = ({children}) =>{
    const[user,setUser] = useState();

    const history = useHistory();

    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        if(!userInfo){
            history.push("/");
        }

    },[history])


    return(

        <ChatContext.Provider value={{user,setUser}}>   // value ={} means it is access to all the wrap
            {children}

        </ChatContext.Provider>
    )
}

//to access to state to the another component


export const ChatState=()=>{        //hold all the states inside the ChatState
   return useContext(ChatContext);

}


export default ChatProvider;