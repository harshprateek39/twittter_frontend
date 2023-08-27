import React, { useState } from "react";
import { FaTwitter } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import Dropdown from "react-dropdown";
import {IoMdArrowDropdown} from 'react-icons/io';
import {PiDotsNineBold} from 'react-icons/pi';
import { BsSearch } from 'react-icons/bs';
import "react-dropdown/style.css";
import { useMediaQuery } from 'react-responsive';

import {useCookies} from "react-cookie";
const Header = () => {
  const navigate =useNavigate();
  const logout =()=>{
    setCookies("access", "");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("userDetail");
    navigate("/login");
    setLogin(!login);
  }
  const [cookies, setCookies] =useCookies(["access"])
  const storedData = localStorage.getItem('userDetail');
  const parsedData = JSON.parse(storedData);
  const [login, setLogin] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 819px)'
  });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 818px)' })
  return (
    <>
     {isDesktopOrLaptop && <div className="App flex justify-between p-3 bg-transparent text-white relative ">
     {login&& <div   className="absolute right-10 top-12 flex flex-col outline-1 outline-white ring-1 ring-white rounded-sm px-3 py-3 z-10 bg-slate-900" >
      
  <h1 className=" cursor-pointer" onClick={ ()=>{ navigate('/login') ; setLogin(!login)}} > {cookies.access?parsedData.name:"Login"}</h1> 
  {cookies.access?<h1 className=" cursor-pointer" onClick={logout}>Logout</h1>:<></>}
     </div>}
        <div className=" flex justify-between items-center gap-4">
          <FaTwitter className=" text-sky-500 font-bold text-2xl cursor-pointer  " onClick={()=>{ navigate('/')}} />
          <input
            type="text "
            placeholder="# Explore"
            className=" outline-none rounded-xl bg-slate-700 px-3 py-1 text-slate-300"
          ></input>
        </div>

        <div className=" flex justify-between items-center gap-4">
        <div className=" flex justify-between items-center gap-5 bg-slate-700 px-2 py-1 rounded-full ">
            <div className=" flex justify-center items-center gap-2">
              <img
                className=" aspect-square h-5 rounded-full font-semibold  ring-1 ring-gray-500"
                src={cookies.access?parsedData.image:"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              ></img>
              <h1>{cookies.access?parsedData.name:"Login"}</h1>
            </div>
            <button className=" " onClick={ ()=>setLogin(!login)}> <IoMdArrowDropdown/>
           
              </button>
          </div>
          <PiDotsNineBold className="  font-black text-3xl"/>
        </div>
        
      </div>}

      
      {isTabletOrMobile &&  <div className="App flex justify-between p-3 bg-transparent text-white relative">
      {login&& <div   className="absolute right-0 left-0 top-12 flex flex-col outline-1 outline-white ring-1 ring-white rounded-sm px-3 py-3 z-10 bg-slate-900" >
      
  <h1 className=" cursor-pointer" onClick={ ()=>{ navigate('/login') ; setLogin(!login)}} > {cookies.access?parsedData.name:"Login"}</h1> 
  {cookies.access?<h1 className=" cursor-pointer" onClick={logout}>Logout</h1>:<></>}
     </div>}
        <div className=" flex justify-between items-center gap-4">
          <FaTwitter className=" text-sky-500 font-bold text-2xl "  onClick={()=>{ navigate('/')}} />
          <div className=" flex justify-between items-center gap-5 bg-slate-700 px-2 py-1 rounded-full ">
            <div className=" flex justify-center items-center gap-2">
              <img
                className=" aspect-square h-5 rounded-full font-semibold  ring-1 ring-gray-500"
                src={cookies.access?parsedData.image:"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              ></img>
              <h1>{cookies.access?parsedData.name:"Login"}</h1>
            </div>
            <button  onClick={ ()=>setLogin(!login)}> <IoMdArrowDropdown/></button>
          </div>
        </div>

        <div className=" flex justify-between items-center gap-4">
          
          <PiDotsNineBold className=" font-extrabold text-2xl"/>
          <BsSearch/>
        </div>
        
      </div>}
      <Outlet />
    </>
  );
};

export default Header;
