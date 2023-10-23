import React from "react";
import { Container, LogoutBtn, Logo } from '../index'
import { useSelector } from "react-redux";
import { useNavigate, Link, NavLink } from "react-router-dom";
import Button from '@mui/material/Button';

const Header = () => {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]
    return (
        <>
            <header className="header mt-2">
                <Container>
                    <div className="header__wrapper">
                        {/*<Link to='/'><Logo /></Link>*/}
                        <nav className="flex">
                            <ul className="flex ml-auto">
                                {navItems.map((item) => (
                                    (item.active) ?
                                        (
                                            <li key={item.name} className="header__nav-item">
                                                <Button className="inline-bock px-6 py-2 " onClick={() => navigate(item.slug)} variant="oulined">{item.name}</Button>
                                            </li>
                                        )
                                        : null
                                ))}
                                {authStatus && (
                                    <li className="header__nav-item">
                                        <LogoutBtn />
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                </Container>
            </header>
        </>
    )
}
export default Header