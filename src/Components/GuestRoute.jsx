import React, { useContext } from 'react'
import { UserContext } from './User.context'
import { Navigate } from 'react-router-dom';

export default function GuestRoute({children}) {

    let {token} = useContext(UserContext);
    if(token) {
        return <Navigate to="/"/>;
    } else {
        return children;
    }
}
