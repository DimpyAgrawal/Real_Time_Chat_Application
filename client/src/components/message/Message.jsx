import React from 'react';
import { format } from 'timeago.js';
import '../../App.css';

export default function Message({ messages, own }) {
  return (
    <div className=" w-full">
      <div className="flex flex-col">
        <div className={`${own ? 'ml-auto' : ''} w-fit  flex flex-col `}>
          <div className="flex w-full items-center">
            <div>
              <img className="rounded-full w-12 h-12" src="https://i.pinimg.com/originals/1d/96/90/1d9690843be5cda879f466d1441cb950.jpg" alt="" />
            </div>
            <div className={`${own ? 'bg-gray-400' : ' bg-blue-400'} rounded-xl custom-scrollbar ml-3 p-2 text-white w-fit overflow-y-auto flex flex-wrap`}>
              {messages.text}
            </div>
          </div>
          <div className=" mt-1 justify-end flex text-xs text-white">
            {format(messages.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
