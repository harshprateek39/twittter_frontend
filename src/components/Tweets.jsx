import axios from 'axios';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import {BsThreeDots,BsFillHeartFill,BsShareFill} from 'react-icons/bs';
import {FaUpload,FaRetweet} from 'react-icons/fa';

import {FaCommentDots} from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';


const Tweets = ({image , comments, text , time  ,name ,user ,likes,picture ,date,id}) => {
  const [cookies, setCookies] = useCookies(["access"]);
  const [likeCount,setLikeCount] = useState(likes?.length)
  const crrDate= new Date();
  
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 767.25px)'
      });
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleReadMore = () => {
      setIsExpanded(!isExpanded);
    };
    const likefn = async(id)=>{
      try {
        
        const data= await axios.put(`https://twitter-nackend-git-main-harshprateek39.vercel.app/api/v1/tweet/${id}`,{id:window.localStorage.getItem('userID')},{headers:{'authorization':cookies.access}});

        
       if(data.data.value==="added"){setLikeCount(likeCount+1)}
       if(data.data.value==="deleted"){setLikeCount(likeCount-1)}
       

      } catch (error) {
         alert("login required for this action")
      }
      
    } 
    
  return (
    <>
        <div className=' flex bg-slate-800 rounded-lg  p-3 my-2 gap-4 justify-between '>
       <img className=' aspect-square h-12 rounded-full  grow-0 ' src={image}></img>
       <div className=' flex flex-col w-full  '>
        <div className='flex justify-between  '>
          <div className=' flex gap-2 items-center'>
            <h1 className=' text-lg font-semibold'>{name}</h1> 
            <h2 className=' text-sm  text-gray-300'> @{user}</h2>
          </div>
          <button> <BsThreeDots className=' text-2xl font-bold text-gray-300'/></button>
        </div>

        <div className='flex '>
          <h2 className=' text-xs  text-gray-400 font-medium'> 16 minutes ago</h2>
        </div>

        <div className=' flex flex-col items-start'>
          <p className=' text-left'> {isExpanded?text: text.length>100?`${text.slice(0,50)}...`:text}</p>
          <button  className=' text-blue-600' onClick={toggleReadMore}>{isExpanded?"Read less":text.length>100?"Read more":""}</button>
        </div>
     
        <div className=' flex justify-between items-center   my-2 gap-2 '>
        <button className=' flex   gap-2 bg-slate-700  py-2 rounded-lg grow justify-center items-center hover:bg-slate-600 ' onClick={()=>likefn(id)}>
           <BsFillHeartFill/>
          { <span>{likeCount}</span>}
        </button>
        <button className=' flex   gap-2 bg-slate-700  py-2 rounded-lg grow justify-center items-center hover:bg-slate-600 '>
           <FaRetweet/>
          { isDesktopOrLaptop&& <span>Retweet</span>  }
        </button>
        <button className=' flex   gap-2 bg-slate-700  py-2 rounded-lg grow justify-center items-center hover:bg-slate-600 '>
           <FaCommentDots/>
          { isDesktopOrLaptop&& <span>Comment</span>  }
        </button>
        <button className={isDesktopOrLaptop?' flex   gap-2 bg-slate-800  ring-1    py-3 rounded-lg justify-center items-center px-3 hover:bg-slate-600 ':'flex   gap-2 bg-slate-800  ring-1    py-2 rounded-lg justify-center items-center px-3 hover:bg-slate-600 '}>
           <BsShareFill/>
           
        </button>
       
        </div>
        {picture?.url&&<img className=' w-56 rounded-md bg-slate-900 h-64 object-contain' src={ picture?.url}></img>}
       </div>
      </div>
    </>
  )
}

export default Tweets;