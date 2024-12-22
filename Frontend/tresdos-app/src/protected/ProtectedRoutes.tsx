import React from 'react'
import { Navigate } from 'react-router-dom';
import { useMyContext } from '../context/MyContext';

interface isAuthenticated {
    
    children: React.ReactNode;
}
const ProtectedRoutes: React.FC<isAuthenticated> = ({children}) => {
    const {isAuthenticated} = useMyContext();
    if(!isAuthenticated) {
       return <Navigate to="/"/>
    }
    return <>{children}</>
}

export default ProtectedRoutes