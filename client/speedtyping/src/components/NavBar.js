import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


function NavBar() {

    const {
        isAuthenticated,
        logout
    } = useAuth();

    return (
        <div>
            <nav className="bg" style={{backgroundColor: '#1F2833'}} >
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="self-center text-2xl" style={{color: '#66FCF1'}}>SpeedTyper</Link>
                
                <ul className="block font-medium flex p-2 items-center gap-6"style={{color: '#66FCF1'}}>
                    {/* <li><CustomNavLink to="/">Home</CustomNavLink></li> */}
                    <li><CustomNavLink to="/">Keyboard</CustomNavLink></li>
                    {/* <li><CustomNavLink to="/words">Words</CustomNavLink></li> */}
                    {isAuthenticated ?
                    <>
                    <li><CustomNavLink to="/user">User</CustomNavLink></li>
                    <li>
                        <button onClick={logout} className="text-rose-600 rounded hover:text-rose-700">Logout</button>
                    </li>
                    </>
                    :
                    <>
                    <li><CustomNavLink to="/sign-up">SignUp</CustomNavLink></li>
                    <li><CustomNavLink to="/login">Login</CustomNavLink></li>
                    </>
                    }
                </ul>
            </div>
            </nav>
        </div>
    )
}

export default NavBar;


function CustomNavLink({to, children}) {
    return (
        <NavLink to={to} className={({isActive}) =>
        isActive ? "text-sky-600 rounded"
        : "block hover:text-sky-700 rounded"}
        >
            {children}
        </NavLink>
    )
}