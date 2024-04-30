import React from 'react';
import Login from './Login';
import Signup from './Signup';

function Authmodal({ setshowmodal,setsign}){
  const handleclick = () =>{
    setshowmodal(false);
    // setactive(false);
  };
  return (
    <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2= bg-white h-[500px]p-5 w-80 rounded-lg">
      <div className="float-right text-black cursor-pointer p-2" onClick={handleclick}>✖</div>
      <Login></Login>
      {/* {setsign?<Signup/>:<Login/>} */}
    </div>
  );
}

export default Authmodal;
