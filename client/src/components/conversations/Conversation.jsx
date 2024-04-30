import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Conversation({user}) {

    return (
        <div className='flex'>
            <div className='flex flex-col'>
               
                    <div className='flex mt-10' > 
                        <div><img className='h-11 w-20 rounded-full' src={user.pic ? user.pic : "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg"} alt="" /></div>
                        <div className='ml-7 w-full font-semibold m-auto'>{user.name ? user.name : "Ramesh"}</div> 
                    </div>
              
            <hr className='bg-gray-300 mt-4 w-full' />
            </div>
        </div>
    );
}
