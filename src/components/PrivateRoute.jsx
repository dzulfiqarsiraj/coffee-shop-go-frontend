import React from "react";
import {useNavigate} from 'react-router-dom'
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
    // const [token, setToken] = React.useState(window.localStorage.getItem('token'))
    const token = useSelector(state => state.auth.token)
    const navigate = useNavigate()

    React.useEffect(() => {
        if(!token){
            navigate('/login')
        }
    },[token, navigate])

    return(
        <>
            {children}
        </>
    )

}

export default PrivateRoute