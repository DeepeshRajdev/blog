import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux";

const Protected = ({ children }, authentication = 'true') => {
    let navigate = useNavigate();
    let [loading, setLoading] = useState(true);
    let authStatus = useSelector((state) => state.auth.status)
    useEffect(() => {
        // if (authentication && authStatus !== authentication) navigate('/login');
        // else if (!authentication && authStatus !== authentication) navigate('/');
         
         if(authentication === 'true' && authStatus === 'false') navigate('/login');
         else if(authentication === 'false' && authStatus === 'true') navigate('/');
        setLoading(false);
    }, [authStatus, authentication, navigate])
    return loading ? (<h1>Loading...</h1>) : (<>{children}</>)
}
export default Protected