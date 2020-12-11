import React, { useState, createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = props => {
    const [userData, setUserData] = useState({});
    
    return (
        <UserContext.Provider value={[userData, setUserData]}>
            {props.children}
        </UserContext.Provider>
    )
}