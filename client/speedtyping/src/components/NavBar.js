import React from 'react'
import { Link, NavLink } from 'react-router-dom'


function NavBar() {
    return (
        <div>
            <nav className="bg-black">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="self-center text-2xl  text-white">SpeedTyper</Link>
                
                <ul className="block font-medium flex p-2 items-center gap-6 text-white">
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
                </ul>
            </div>
            </nav>
        </div>
    )
}

export default NavBar