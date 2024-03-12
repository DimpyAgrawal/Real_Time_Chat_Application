import React from 'react'
import {useHistory} from 'react-router-dom';

export default function Home() {
  const[user,setUser] = useState();

  const history = useHistory();

  useEffect(()=>{
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUser(userInfo);
      //if user is there then push to the chats
      if(user){
          history.push("/chats");
      }

  },[history])

  return (
    <div>
      home
    </div>
  )
}
