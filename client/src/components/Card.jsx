import React, { useEffect, useState,useContext  } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Card(props) {


     const userId = localStorage.getItem('id');
     const [buttonClicked, setButtonClicked] = useState(props.card.likedUser.length);
     const [liked, setLiked] = useState(props.card.likedUser.includes(userId));

     const [friend , setFriend] = useState(props.card.friend.includes(userId))
   
    const onHandleLike = async (id) => {
      try {
        const res2 = await axios.put(`http://localhost:8080/like/${id}`, { id: userId });
        if (res2.data.msg === "dislike" ) {
          setLiked(false);
          setButtonClicked(prevCount => prevCount - 1); 
        } else {
          setLiked(true);
          setButtonClicked(prevCount => prevCount + 1); 
        }
      } catch (err) {
        console.log('error in uploading', err);
      }
    };


    const onHandleRequest = async (id) => {
      try {
        const res2 = await axios.put(`http://localhost:8080/friend/${id}`, { id: userId });
        console.log(res2.data.msg);
        if (res2.data.msg === "unfriend" ) {
          setFriend(false);
          // setButtonClicked(prevCount => prevCount - 1); 
        } else {
          setFriend(true);
          // setButtonClicked(prevCount => prevCount + 1); 
        }
      } catch (err) {
        console.log('error in uploading', err);
      }
    };
    
  return (
    <div>
      <div className="flex flex-col max-w-xl h-auto w-96 p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-900 dark:text-gray-100">
        <div className="flex space-x-4">
          <div className="flex flex-col space-y-1">
            <a rel="noopener noreferrer" href="#" className="text-lg font-semibold">{props.card.name}</a>
            <span className="text-xs dark:text-gray-400">4 hours ago</span>
          </div>
        </div>
        <div className='h-72 w-full'>
          <img src={props.card.pic} alt="" className="object-cover mb-4 h-full w-full dark:bg-gray-500 rounded-lg" loading="lazy" />
        </div>
        <h2 className="mb-1 text-xl font-semibold">Nam cu platonem posidonium sanctus debitis te</h2>
        <div className='flex justify-around'>
            <button  className='text-white bg-red-600 px-3 rounded-full '>Ignore</button>
            <button onClick={()=>{onHandleRequest(props.card._id)}}  className='text-white bg-green-500 px-3 rounded-full'> {friend ? `Friend ❤️` : `Request 🤝`}</button>

            <button onClick={() => { onHandleLike(props.card._id) }}
          className='text-white bg-red-600 px-3 rounded-full '> 
                {liked ? `Liked ❤️${buttonClicked}` : `Like 👍${buttonClicked}`}
          </button>

            <button className='text-white bg-blue-500 px-3 rounded-full'>Profile</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
