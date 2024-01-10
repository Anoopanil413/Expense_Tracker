import React, { Children, useContext } from 'react'

import { createContext } from "react";
import localStorageHook from "../components/customHooks/localStorage";


const userAuthContext = createContext()

export const UserContext = ({ children }) => {
    let token = window.localStorage.getItem('token')


    return (<userAuthContext.Provider value={token}>{children}</userAuthContext.Provider>)
}

export const useAuth = () => {
    return useContext(userAuthContext)
};


