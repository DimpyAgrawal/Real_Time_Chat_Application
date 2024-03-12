import React from 'react'
<<<<<<< HEAD
// import {useHistory} from 'react-router-dom';

export default function Home() {
  // const[user,setUser] = useState();

  // const history = useHistory();

  // useEffect(()=>{
  //     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //     setUser(userInfo);
  //     //if user is there then push to the chats
  //     if(user){
  //         history.push("/chats");
  //     }

  // },[history])

=======
import Sidebar from './Sidebar'
import ChatSide from './ChatSide'

const Home = () => {
>>>>>>> 9a0e0ff990ac5891e0a544aa44c88e5e6e4dd832
  return (
    <div>
       <Sidebar></Sidebar>
    </div>
  )
}

export default Home
