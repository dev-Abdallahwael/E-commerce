import React, { useContext } from 'react'
import { UserContext } from './User.context'
import { Navigate } from 'react-router-dom';

export default function ProtectedRouter({children}) {

    let {token} = useContext(UserContext);
    if(token) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
}
