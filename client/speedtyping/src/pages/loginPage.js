import React, { useState } from 'react';
import api from '../api/axiosConfig.js'


function LoginPage() {

    const getTokenFromCookie = () => {
        const cookieToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
        if (cookieToken) {
            return cookieToken.split('=')[1];
        }
        return null;
    }

    const setTokenInCookie = (tokenValue) => {
        document.cookie = `token=${tokenValue}; Path=/; HttpOnly`;
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const userJsonData = formToJSON(new FormData(e.target));

        //odbieranie danych z form
        const response = api.post('/auth/sign-in', userJsonData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.data.get('logged_in')) {
            const token = response.data.token;
            setTokenInCookie(token);
            console.log(token);
        } else {
            console.log("login failed");
        }

    };
        
    const handleLogout = () => {
        setTokenInCookie(null);
    };

    return (
        <div className="flex justify-center">
            <form className="flex flex-col ">
                <div>
                    <label htmlFor='Email'>Email</label>
                    <input type='email' name='email' placeholder="email"/>
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password'/>
                </div>

                <button onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}

export default LoginPage;