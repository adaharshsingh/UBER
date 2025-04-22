import React from 'react'
import { useState, createContext } from 'react'


export const UserDataContext = createContext()
const UserContext = ({children}) => {
    const[userData, setUserData] = useState({
        fullname:{
            firstName: "",
            lastName: ""    
        },
        email: "",
        password: ""
    })

  return (
    <div>
        <UserDataContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext
