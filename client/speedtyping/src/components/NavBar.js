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
                    <li>
                    <NavLink to="/" className={({isActive}) => 
                    isActive ? "text-sky-600 rounded"
                    : "block"}
                    >
                        Home
                    </NavLink>
                    </li>
                    <li>
                    <NavLink to="/keyboard" className={({isActive}) =>
                    isActive ? "text-sky-600 rounded"
                    : "block"}
                    >
                        Keyboard
                    </NavLink>
                    </li>
                    <li>
                    <NavLink to="/words" className={({isActive}) =>
                    isActive ? "text-sky-600 rounded"
                    : "block"}
                    >
                        Words
                    </NavLink>
                    </li>
                    {isAuthenticated ?
                    <>
                    <li>
                    <NavLink to="/user" className={({isActive}) =>
                    isActive ? "text-sky-600 rounded"
                    : "block"}
                    >
                        User
                    </NavLink>
                    </li>
                    <li>
                    <button onClick={logout} className="text-rose-600 rounded hover:text-rose-700">Logout</button>
                    </li>
                    </>
                    :
                    <>
                    <li>
                    <NavLink to="/sign-up" className={({isActive}) =>
                    isActive ? "text-sky-600 rounded"
                    : "block"}
                    >
                        SignUp
                    </NavLink>
                    </li>
                    <li>
                    <NavLink to="/login" className={({isActive}) =>
                    isActive ? "text-sky-600 rounded"
                    : "block"}
                    >
                        Login
                    </NavLink>
                    </li>
                    </>
                    }
                </ul>
            </div>
            </nav>
        </div>
    )
}

export default NavBar