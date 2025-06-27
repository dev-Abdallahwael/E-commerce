import { createContext } from "react";
import { useState } from 'react';

export const UserContext = createContext(null);

export default function UserProvider({children}){

    
    const [ token , SetToken ] = useState(localStorage.getItem("token"));

    function logout(){
        SetToken(null);
        localStorage.removeItem("token");
    }
    
    return <>
        <UserContext.Provider value={{token ,SetToken,logout}}>
            {children}
        </UserContext.Provider>
    </>
}