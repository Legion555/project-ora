import React, { useState, createContext } from 'react';

export const ClassesContext = createContext();

export const ClassesProvider = props => {
    const [classesData, setClassesData] = useState('');
    
    return (
        <ClassesContext.Provider>
            {props.children}
        </ClassesContext.Provider>
    )
}