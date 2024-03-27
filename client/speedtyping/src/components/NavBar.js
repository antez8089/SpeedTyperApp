import React from 'react'
import { Link, NavLink } from 'react-router-dom'


function NavBar() {
    return (
        <div>
            <nav className="bg" style={{backgroundColor: '#0B0C10'}} >
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="self-center text-2xl" style={{color: '#66FCF1'}}>SpeedTyper</Link>
                
                <ul className="block font-medium flex p-2 items-center gap-6"style={{color: '#66FCF1'}}>
                    <li>
                    <NavLink to="/" className={({isActive}) => 
                    isActive ? "text-rose-600 rounded"
                    : "block"}
                    >
                        Home
                    </NavLink>
                    </li>
                    <li>
                    <NavLink to="/keyboard" className={({isActive}) =>
                    isActive ? "text-rose-600 rounded"
                    : "block"}
                    >
                        Keyboard
                    </NavLink>
                    </li>
                    <li>
                    <NavLink to="/words" className={({isActive}) =>
                    isActive ? "text-rose-600 rounded"
                    : "block"}
                    >
                        Words
                    </NavLink>
                    </li>
                    <li>
                    <NavLink to="/sign-up" className={({isActive}) =>
                    isActive ? "text-rose-600 rounded"
                    : "block"}
                    >
                        SignUp
                    </NavLink>
                    </li>
                    <li>
                    <NavLink to="/login" className={({isActive}) =>
                    isActive ? "text-rose-600 rounded"
                    : "block"}
                    >
                        Login
                    </NavLink>
                    </li>
                    <li>
                    <NavLink to="/user" className={({isActive}) =>
                    isActive ? "text-rose-600 rounded"
                    : "block"}
                    >
                        User
                    </NavLink>
                    </li>
                </ul>
            </div>
            </nav>
        </div>
    )
}

export default NavBar