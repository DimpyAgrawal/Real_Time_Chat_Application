import React from 'react';

export default function ProfilePage({ setShowProfile, user }) {
  return (
    <div className='flex w-screen h-screen bg-gray-100 bg-opacity-70 fixed left-0 top-0'>
      <div className='flex flex-col m-auto bg-white shadow-2xl rounded-md p-4 w-96'>
        <div>
          <span className="material-symbols-outlined ml-auto cursor-pointer" onClick={() => setShowProfile(false)}>close</span>
        </div>
        <div>
          <h1 className='font-semibold text-4xl text-center'>{user.name}</h1>
        </div>
        <div>
          <img className='h-32 mx-auto rounded-lg mt-6' src={user.pic} alt={user.name} />
        </div>
        <div className='text-2xl mt-6'>
          <div>Email:</div>
          <div>{user.email}</div>
        </div>
      </div>
    </div>
  );
}
