import React from "react"
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import auth from '../../appwrite/authentication'
import { logout } from '../../store/authSlice'

const LogoutBtn = () => {
    let dispatch = useDispatch();
    return (
        <>
            <Button type="submit" onClick={() => {
                auth.logout()
                    .then(() => {
                        dispatch(logout())
                    })
            }} variant="outlined">Logout</Button>
        </>
    )
}
export default LogoutBtn