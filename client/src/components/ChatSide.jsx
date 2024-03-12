import React,{useState} from 'react'
// import Chat from './chat';
// import Defaultchat from './defaultchat';
const ChatSide = () => {
    const chatele=[{img:<img src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e" className="w-10 h-10 rounded-full" />
    ,name:"Hermione Granger",msg:"Heyloo"},
  {img:<img src="https://randomuser.me/api/portraits/men/86.jpg" className="w-10 h-10 rounded-full" />
    ,name:"Harry Potter",msg:"How are you?"},
  {img:<img src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg" className="w-10 h-10 rounded-full" />
    ,name:"Ron Weasley",msg:"Heiii"},
  {img:<img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f" className="w-10 h-10 rounded-full" />
    ,name:"Hagrid",msg:"Hey"},
  ]
    const [modarr,setchatele]=useState([]);
  const ar=[]
  const [clicked,setclick]=useState(false)
  const [message, setMessage]=useState("");
  const handleChange=event=>{
    // setMessage(event.target.value);
    const newMessage = event.target.value;
  setMessage(newMessage);
  // Get the length of the new message
  const messageLength = newMessage.length;
//   console.log(messageLength);
    // console.log(setMessage)
    const modarr=chatele.filter(ele=>{return (ele.name.includes(message))})
    // setchatele(e=>());
    console.log(modarr.length==0?chatele:modarr);

  }
//   const getdata=eve=>{
//     console.log(eve.target)
//   }
// const getTextContent =eve=> {
//     // const element = document.getElementById('myspan'); // Access the element by ID
//     // if (element) {
//     //   const content = element.textContent;
//     console.log(eve.target)
//     //   setTextContent(content); // Set the text content in state
//     }
// console.log(object)
const [clickedData, setClickedData] = useState({});
  const handleSpanClick = (data) => {
    setClickedData(data);
  };
  return (
    <div>
      <div className="fixed top-0 left-20 w-40 h-full border-r border-gray-500 bg-violet-50 space-y-8 sm:w-[15rem]">
    
    <div className="p-3 text-xl">
      <div className="space-y-3 mb-2">Chats</div>

    <input type="search" className="rounded-lg w-full text-sm h-[2rem] p-2 inline-flex" placeholder="Search" onChange={handleChange}></input>  

    <div className="border-b-3 rounded-2xl bg-slate-400 h-1 w-full mt-3" ></div>
    {chatele.map((data)=>
    <div className="space-y-4 mt-3">
    <div className="flex items-center gap-x-3 bg-white p-2 rounded-lg" onClick={()=>{setclick(true)}}>
        <span className="flex p-1"key={data.id}
          onClick={() => handleSpanClick(data)}>
        <span className="w-10 h-10 rounded-full">{data.img}</span>
          <div className="ml-2">
              <span className="block text-gray-700 text-sm font-small" >{data.name}</span>
              {/* <button className="border-2 bg-red-500" onClick={getTextContent}>get</button> */}
              <a href="javascript:void(0)" className="block text-indigo-600 hover:text-indigo-500 text-xs">{data.msg}</a>
          </div>
          </span>
      </div>
      </div>
      )
    }
    </div>
  </div>
  {/* {clicked?<Chat dtaa={clickedData}></Chat>:<Defaultchat/>} */}
    </div>
  )
}

export default ChatSide
