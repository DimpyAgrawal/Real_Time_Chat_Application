import React from "react";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import Nav_bar from "../components/Navbar";
import { useState } from "react";
import Nav from "./Nav";
import Autmod from './Autmod';

function Landing() {
  const [showmodal,setshowmodal]=useState(false);
  const [match,setmatch]=useState(false);
  const [sign,setsign]=useState(false);
  const handleclick=()=>{
    setshowmodal(true)
    setmatch(true);
    // setsign(true)
  }
  return (
    <div className="relative ">
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-fixed z-0 bg-opacity-50 brightness-50 "
        style={{ backgroundImage: "url(/images/bgimg.webp)" }}
      ></div>
      <div className="relative h-screen">
        <Nav setmatch={setmatch} />
        <section>
          <div className="max-w-screen-xl mx-auto px-4 pt-[10rem] text-white md:px-8 md:flex">
            <h1 className="flex justify-center text-xl text-white-500 font-semibold font-serif sm:text-7xl mx-auto overflow-hidden">
              <Typewriter
                options={{
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  strings: ["Let's Match it"],
                }}
              />
            </h1>

          </div>
          <div className="flex justify-center p-4 ">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-lg text-white p-2 font-semibold" onClick={handleclick}>
                Create Account
              </button>
              {showmodal &&(<Autmod setshowmodal={setshowmodal} setsign={setsign}/>)}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Landing;
