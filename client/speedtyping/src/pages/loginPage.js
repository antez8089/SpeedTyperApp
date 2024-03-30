import { formToJSON } from 'axios';
import Cookies from 'js-cookie';
import api from '../api/axiosConfig.js'


function LoginPage() {

    const getTokenFromCookie = () => {
        return Cookies.get('token');
    }

    const setTokenInCookie = (token) => {
        Cookies.set('token', token, {path: '/'})
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const userData = new FormData(e.target);

        const userJsonData = formToJSON(userData);

        const response = await api.post('/auth/sign-in', userJsonData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.data.logged_in) {
            const token = response.data.token;
            setTokenInCookie(token);
        } else {
            console.log("login failed");
        }

    };


    return (
        <div className="flex justify-center">
            <form className="flex flex-col " onSubmit={handleLogin}>
                <input type='email' name='email' placeholder="email"/>
                <input type='password' name='password'/>
                <input type='submit' />
            </form>
        </div>
    )
}

export default LoginPage;