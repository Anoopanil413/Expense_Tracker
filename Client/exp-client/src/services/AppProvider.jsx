import React from 'react'
import { UserContext } from '../contextApi/UserContext'

const AppProvider = ({ children }) => {
    return (
        <>
            <UserContext>{children}</UserContext>
        </>
    )
}

export default AppProvider