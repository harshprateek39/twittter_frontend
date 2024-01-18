import { createContext, useState } from "react";

export const Context=createContext(null);
export const ContextProvider=(props)=>{
    const[currentUser,setCurrentUser] = useState(null);
    const [tweets,setTweets]=useState([]);
    return <Context.Provider value={{currentUser,setCurrentUser,tweets,setTweets}}>
        {props.children}
    </Context.Provider>
}
